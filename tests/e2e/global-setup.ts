import type { FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL || process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000'

  // 1. Verify dev server is running
  try {
    const response = await fetch(baseURL)
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }
  } catch (error) {
    throw new Error('Dev server not running. Run `pnpm dev` first.')
  }

  // 2. Automate seed data
  const endpoints = [
    '/next/seed-cities',
    '/next/seed-globals',
    '/next/seed-pages',
    '/next/seed-posts',
    '/next/parse-listings?per=20',
  ]

  console.log('Seeding data...')

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${baseURL}${endpoint}`, { method: 'POST' })
      if (!response.ok) {
        console.error(`Failed to seed ${endpoint}: ${response.statusText}`)
      } else {
        console.log(`Successfully seeded ${endpoint}`)
      }
    } catch (error) {
      console.error(`Error seeding ${endpoint}:`, error)
    }
  }
}

export default globalSetup
