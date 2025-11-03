'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import { CheckIcon } from '@radix-ui/react-icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { RangeFilter } from './RangeFilter'

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

// 👇 новые пропсы соответствуют структуре блока
type Props = {
  label: string
  collection: string
  fields: FilterField[]
}

export const UniversalFilterFormBlock = ({ label, collection, fields }: Props) => {
  const [totalResults, setTotalResults] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues: Record<string, any> = {}
  fields.forEach((field) => {
    if (field.type === 'range') {
      defaultValues[`${field.name}Min`] = field.min || 0
      defaultValues[`${field.name}Max`] = field.max || 1000000
    } else {
      defaultValues[field.name] = field.type === 'checkbox' ? false : ''
    }
  })

  const form = useForm({ defaultValues })
  const { register, watch, setValue } = form
  const values = watch()

  const buildSearchParams = () => {
    const params = new URLSearchParams()

    fields.forEach((field) => {
      switch (field.type) {
        case 'checkbox':
          if (values[field.name]) {
            params.append(`where[${field.name}]`, 'true')
          }
          break

        case 'multi-select':
          if (Array.isArray(values[field.name]) && values[field.name].length > 0) {
            params.append(`where[${field.name}][in]`, values[field.name].join(','))
          }
          break

        case 'range':
          const minVal = values[`${field.name}Min`]
          const maxVal = values[`${field.name}Max`]
          if (minVal !== undefined && !isNaN(minVal)) {
            params.append(`where[${field.name}][gte]`, String(minVal))
          }
          if (maxVal !== undefined && !isNaN(maxVal)) {
            params.append(`where[${field.name}][lte]`, String(maxVal))
          }
          break

        default:
          const value = values[field.name]
          if (value !== undefined && value !== '') {
            params.append(`where[${field.name}]`, String(value))
          }
      }
    })

    return params
  }

  const fetchResults = async () => {
    setIsLoading(true)
    const params = buildSearchParams()
    const res = await fetch(`/api/${collection}?${params.toString()}`)
    const data = await res.json()
    const results = data.docs || []

    setTotalResults(results.length)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchResults()
  }, [JSON.stringify(values)])

  const renderField = (field: FilterField) => {
    const id = `filter-field-${field.name}`
    const label = field.label || field.name

    switch (field.type) {
      case 'text':
        return (
          <div key={field.name}>
            <label htmlFor={id}>{label}</label>
            <input {...register(field.name)} id={id} className="w-full border p-2 rounded" />
          </div>
        )

      case 'number':
        return (
          <div key={field.name}>
            <label htmlFor={id}>{label}</label>
            <input
              {...register(field.name, { valueAsNumber: true })}
              id={id}
              type="number"
              className="w-full border p-2 rounded"
            />
          </div>
        )

      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center gap-2">
            <Checkbox.Root
              id={id}
              checked={!!values[field.name]}
              onCheckedChange={(checked) => setValue(field.name, checked)}
              className="w-5 h-5 flex items-center justify-center bg-white border border-gray-300 rounded"
            >
              <Checkbox.Indicator>
                <CheckIcon className="text-blue-600" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={id}>{label}</label>
          </div>
        )

      case 'range':
        return (
          <div key={field.name}>
            <RangeFilter
              label={label}
              min={field.min || 0}
              max={field.max || 1000000}
              step={field.step || 1000}
              valueMin={values[`${field.name}Min`]}
              valueMax={values[`${field.name}Max`]}
              onChangeMin={(val) => setValue(`${field.name}Min`, val)}
              onChangeMax={(val) => setValue(`${field.name}Max`, val)}
            />
          </div>
        )

      case 'select':
        return (
          <div key={field.name}>
            <label htmlFor={id}>{label}</label>
            <Select.Root
              value={String(values[field.name])}
              onValueChange={(value) => setValue(field.name, value)}
            >
              <Select.Trigger className="w-full border p-2 rounded">
                <Select.Value placeholder="Выберите" />
              </Select.Trigger>
              <Select.Content>
                {field.options?.map((opt) => (
                  <Select.Item key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
        )

      case 'multi-select':
        return (
          <div key={field.name}>
            <label>{label}</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {field.options?.map((opt) => (
                <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                  <Checkbox.Root
                    id={`${id}-${opt.value}`}
                    checked={
                      Array.isArray(values[field.name]) && values[field.name].includes(opt.value)
                    }
                    onCheckedChange={(checked) => {
                      const current = values[field.name] || []
                      const updated = checked
                        ? [...current, opt.value]
                        : current.filter((v: string) => v !== opt.value)
                      setValue(field.name, updated)
                    }}
                    className="w-5 h-5 flex items-center justify-center bg-white border border-gray-300 rounded"
                  >
                    <Checkbox.Indicator>
                      <CheckIcon className="text-blue-600" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="my-8 p-6 border rounded bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{label}</h2>
      <form className="space-y-4">
        {fields.map(renderField)}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full text-left relative"
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="animate-ping inline-block w-2 h-2 mr-2 rounded-full bg-white"></span>
              Загрузка...
            </span>
          ) : (
            `Найти ${totalResults !== null ? `(${totalResults})` : ''}`
          )}
        </button>
      </form>
    </section>
  )
}

type FilterGroup = {
  label: string
  collection: string
  fields: FilterField[]
}

export const UniversalFilterTabs = ({ filters }: { filters: FilterGroup[] }) => {
  return (
    <Tabs defaultValue={filters[0]?.label} className="w-full">
      <TabsList className="mb-4 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <TabsTrigger
            key={filter.label}
            value={filter.label}
            className="px-4 py-2 text-sm rounded border"
          >
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {filters.map((filter) => (
        <TabsContent key={filter.label} value={filter.label}>
          <UniversalFilterFormBlock
            label={filter.label}
            collection={filter.collection}
            fields={filter.fields}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
