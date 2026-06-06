<#
.SYNOPSIS
  Captures the full state of the local Realty dev stack into a single archive
  that can be uploaded to a production server and restored there.

.DESCRIPTION
  Bundles:
    - Postgres dump via pg_dump from the running compose container
    - public/media/ (uploaded images & files)
    - .env.template (secrets stripped)
    - the current git commit SHA so the server checks out the matching code

.EXAMPLE
  ./scripts/snapshot.ps1
  # produces backups\realty-snapshot-YYYYMMDD-HHMMSS.tar.gz
#>

[CmdletBinding()]
param(
  [string]$OutDir = "backups"
)

$ErrorActionPreference = 'Stop'

# Locate the repo root (this script lives in /scripts)
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not (Test-Path .env)) {
  Write-Error "❌ .env not found at $root. Create it from .env.example first."
  exit 1
}

# Need docker compose running for pg_dump
$psOutput = docker compose ps --status running --quiet 2>$null
if (-not $psOutput) {
  Write-Error "❌ docker compose stack isn't running. Start with: docker compose up -d"
  exit 1
}

# Locate the postgres service
$postgresContainer = docker compose ps -q postgres 2>$null
if (-not $postgresContainer) {
  Write-Error "❌ postgres service isn't in the compose project."
  exit 1
}

# Read POSTGRES_USER / POSTGRES_DB from .env
$envHash = @{}
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*([^#=]+)=(.*)$') {
    $envHash[$Matches[1].Trim()] = $Matches[2].Trim()
  }
}
$pgUser = $envHash['POSTGRES_USER']
$pgDb   = $envHash['POSTGRES_DB']
if (-not $pgUser -or -not $pgDb) {
  Write-Error "❌ POSTGRES_USER / POSTGRES_DB missing from .env"
  exit 1
}

# Prepare staging dir
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$stage = New-Item -ItemType Directory -Path (Join-Path $env:TEMP "realty-snap-$stamp")
$null = New-Item -ItemType Directory -Path $OutDir -Force

Write-Host "▸ Postgres dump ($pgDb)..." -ForegroundColor Cyan
$dumpPath = Join-Path $stage 'db.sql'
# PowerShell-овский `>` пишет в UTF-16 LE с BOM, что ломает psql при
# восстановлении (`invalid byte sequence for encoding "UTF8": 0xff`).
# Используем cmd.exe для raw-байтового редиректа — он сохраняет вывод как есть.
cmd.exe /c "docker compose exec -T postgres pg_dump -U $pgUser -d $pgDb --no-owner --clean --if-exists > `"$dumpPath`""

if (-not (Test-Path $dumpPath) -or (Get-Item $dumpPath).Length -lt 1024) {
  Write-Error "❌ pg_dump produced an empty file. Check that the database has data and that compose is running."
  exit 1
}

# Verify no BOM (extra safety).
$head = [byte[]]::new(3)
$fs = [System.IO.File]::OpenRead($dumpPath)
[void]$fs.Read($head, 0, 3); $fs.Close()
if ($head[0] -eq 0xFF -or $head[0] -eq 0xEF) {
  Write-Warning "❌ db.sql still starts with BOM. Restoration will fail on Postgres."
  exit 1
}

Write-Host "▸ Media files (public/media/)..." -ForegroundColor Cyan
if (Test-Path "public\media") {
  Copy-Item -Recurse "public\media" (Join-Path $stage 'media')
} else {
  $null = New-Item -ItemType Directory -Path (Join-Path $stage 'media')
  'no media yet' | Out-File (Join-Path $stage 'media\README.txt') -Encoding utf8
}

Write-Host "▸ .env.template (secrets stripped)..." -ForegroundColor Cyan
$secretKeys = @(
  'PAYLOAD_SECRET','POSTGRES_PASSWORD','CRON_SECRET',
  'PREVIEW_SECRET','SMTP_PASS','RESEND_API_KEY'
)
Get-Content .env | Where-Object {
  $line = $_
  $isSecret = $false
  foreach ($k in $secretKeys) {
    if ($line -match "^\s*$k=") { $isSecret = $true; break }
  }
  -not $isSecret
} | Out-File (Join-Path $stage '.env.template') -Encoding utf8

Write-Host "▸ Git commit SHA..." -ForegroundColor Cyan
try {
  $sha = (git rev-parse HEAD).Trim()
  "$sha" | Out-File (Join-Path $stage 'COMMIT_SHA.txt') -Encoding ascii
} catch {
  'unknown' | Out-File (Join-Path $stage 'COMMIT_SHA.txt') -Encoding ascii
}

Write-Host "▸ Manifest..." -ForegroundColor Cyan
@"
Realty production snapshot
Created: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
DB:      $pgDb
User:    $pgUser
Commit:  $sha
"@ | Out-File (Join-Path $stage 'MANIFEST.txt') -Encoding utf8

# Pack with tar (Windows 10+ ships bsdtar via libarchive).
# Use -C to set the source directory instead of cd-ing into it: this lets us
# keep an absolute output path AND lets bsdtar handle Windows paths cleanly.
$archive = Join-Path $OutDir "realty-snapshot-$stamp.tar.gz"
$archiveAbs = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $archive))
Write-Host "▸ Packing → $archive" -ForegroundColor Cyan
tar -czf "$archiveAbs" -C "$stage" .

# Cleanup staging
Remove-Item -Recurse -Force $stage

$size = (Get-Item $archiveAbs).Length / 1MB
Write-Host ""
Write-Host "✅ Snapshot ready: $archiveAbs ($('{0:N1}' -f $size) MB)" -ForegroundColor Green
Write-Host ""
Write-Host "Upload to the server and run there:" -ForegroundColor Yellow
Write-Host "  scp '$archiveAbs' user@server:/srv/realty/"
Write-Host "  ssh user@server"
Write-Host "  cd /srv/realty"
Write-Host "  ./scripts/deploy.sh realty-snapshot-$stamp.tar.gz"
