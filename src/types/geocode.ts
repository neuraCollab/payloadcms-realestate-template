// types/geocode.ts
export interface GeocodeResult {
  lat: number
  lng: number
  displayName: string
  address: {
    road?: string
    house_number?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
  }
}

export interface GeocodeError {
  error: string
  message: string
}

export interface GeocodeOptions {
  language?: string
  countryCodes?: string[]
  limit?: number
}
