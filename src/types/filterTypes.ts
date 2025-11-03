// types/filterTypes.ts

export type FieldType = 'text' | 'number' | 'checkbox' | 'select' | 'multi-select' | 'range'

export type FilterField = {
  name: string
  label?: string
  type: FieldType
  options?: Array<{ value: string; label: string }>
  min?: number
  max?: number
  step?: number
}

export type FilterConfig = {
  collection: string
  fields: FilterField[]
}
