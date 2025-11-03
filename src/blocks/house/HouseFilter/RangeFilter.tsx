// components/filters/RangeFilter.tsx

import React from 'react'

type Props = {
  label: string
  min: number
  max: number
  step: number
  valueMin: number
  valueMax: number
  onChangeMin: (value: number) => void
  onChangeMax: (value: number) => void
}

export const RangeFilter: React.FC<Props> = ({
  label,
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
}) => {
  return (
    <div className="space-y-2">
      <label className="block font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => onChangeMin(Number(e.target.value))}
          className="w-full border p-2 rounded text-sm"
        />
        <span>—</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) => onChangeMax(Number(e.target.value))}
          className="w-full border p-2 rounded text-sm"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMin}
        onChange={(e) => onChangeMin(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMax}
        onChange={(e) => onChangeMax(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
    </div>
  )
}
