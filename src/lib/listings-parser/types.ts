/**
 * Common types for the listings-parser pipeline.
 *
 * Provider → RawListing → NormalizedListing → Payload doc create()
 */

export type SourceId = 'avito' | 'sutochno' | 'etagi'

export type PayloadCollection = 'flats' | 'commercial' | 'lands' | 'residential-complexes'

/**
 * Raw shape as produced by a provider. Free-form for the provider's convenience.
 */
export interface RawListing {
  source: SourceId
  externalId: string
  capturedAt: string // ISO timestamp
  data: Record<string, unknown>
}

/**
 * Provider-agnostic shape after normalization. Maps 1:1 onto our collections.
 */
export interface NormalizedListing {
  source: SourceId
  externalId: string
  collection: PayloadCollection
  payload: Record<string, unknown>
}

/**
 * A provider knows how to fetch a batch of listings of a given size.
 * Mock providers return synthetic data immediately; the playwright provider
 * would (if enabled) drive a browser to scrape real pages.
 */
export interface ListingsProvider {
  id: SourceId
  /** Human-readable name for logs / UI. */
  label: string
  /** Returns up to `limit` raw listings. */
  fetch(limit: number): Promise<RawListing[]>
  /** Normalizes a raw listing into something Payload can persist. */
  normalize(raw: RawListing): NormalizedListing | Promise<NormalizedListing>
}

export interface IngestResult {
  source: SourceId
  attempted: number
  created: number
  skipped: number
  errors: Array<{ externalId: string; reason: string }>
}
