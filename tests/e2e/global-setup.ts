import { FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

  try {
    // Simple health check to see if the server is up
    const res = await fetch(baseURL)
    if (!res.ok && res.status !== 404 && res.status !== 500) {
      // If it doesn't throw, it's alive.
    }
  } catch (error) {
    console.error(`\n❌ Dev server not running. Run \`pnpm dev\` first.\n`);
    process.exit(1);
  }

  console.log(`\n🌱 Seeding data to ${baseURL}...`);

  const endpoints = [
    '/next/seed-cities',
    '/next/seed-globals',
    '/next/seed-pages',
    '/next/seed-posts',
    '/next/parse-listings?per=20'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`   POST ${endpoint}`);
      const res = await fetch(`${baseURL}${endpoint}`, { method: 'POST' });
      if (!res.ok) {
        console.error(`   ❌ Failed to seed ${endpoint}: ${res.status} ${res.statusText}`);
        const text = await res.text();
        console.error(`      ${text}`);
        process.exit(1);
      }
    } catch (error) {
      console.error(`   ❌ Failed to fetch ${endpoint}`, error);
      process.exit(1);
    }
  }

  console.log('✅ Seeding complete!\n');
}

export default globalSetup;
