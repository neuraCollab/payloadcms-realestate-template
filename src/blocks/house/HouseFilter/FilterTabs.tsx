// components/filters/FilterTabs.tsx

import React, { useState } from 'react'

type TabType = 'flats' | 'commercial'

const tabLabels: Record<TabType, string> = {
  flats: 'Квартиры',
  commercial: 'Коммерческая недвижимость',
}

type Props = {
  children: Record<TabType, React.ReactNode>
}

export const FilterTabs = ({ children }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>('flats')

  return (
    <div className="border rounded p-4 space-y-4">
      <div className="flex gap-4 border-b pb-2">
        {Object.entries(tabLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as TabType)}
            className={`px-3 py-1 font-medium ${
              activeTab === key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div>{children[activeTab]}</div>
    </div>
  )
}
