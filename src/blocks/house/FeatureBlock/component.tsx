'use client'
import React from 'react'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Feature = {
  icon: string
  title: string
  description: string
}

export type FeatureBlockType = {
  blockType: 'feature'
  label: string
  title: string
  features: Feature[]
}

const iconMap: Record<string, LucideIcon> = {
  'user-check': Icons.UserCheck,
  settings: Icons.Settings,
  'trending-up': Icons.TrendingUp,
  'refresh-cw': Icons.RefreshCw,
  users: Icons.Users,
  'shield-check': Icons.ShieldCheck,
  home: Icons.Home,
  key: Icons.Key,
  'map-pin': Icons.MapPin,
  phone: Icons.Phone,
  mail: Icons.Mail,
  calendar: Icons.Calendar,
  heart: Icons.Heart,
  star: Icons.Star,
  'check-circle': Icons.CheckCircle,
  award: Icons.Award,
}

export const FeatureBlock: React.FC<FeatureBlockType> = ({ label, title, features }) => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 space-y-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {label}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto text-gray-900 leading-tight">
            {title}
          </h2>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Icons.Settings
            return (
              <div 
                key={index} 
                className="p-6 rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all duration-300 transform hover:translate-y-[-4px] group opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${0.3 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
