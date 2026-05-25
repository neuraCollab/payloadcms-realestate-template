import React from 'react'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Item = {
  icon: string
  title: string
  description: string
}

export type VisionBlockType = {
  blockType: 'vision'
  title: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  items: Item[]
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
  building: Icons.Building2,
  briefcase: Icons.Briefcase,
  sparkles: Icons.Sparkles,
}

export const VisionBlock: React.FC<VisionBlockType> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  items,
}) => {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Левая часть */}
        <div className="space-y-6">
          {subtitle && (
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {subtitle}
            </div>
          )}
          <h2 className="text-headline md:text-display text-on-surface leading-tight">
            {title}
          </h2>

          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-body-sm font-medium shadow-e1 hover:shadow-e2"
            >
              {buttonText}
            </a>
          )}
        </div>

        {/* Правая часть — список */}
        <ul className="space-y-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Icons.Sparkles
            return (
              <li
                key={index}
                className="flex items-start gap-4 p-4 rounded-md bg-card shadow-e1 hover:shadow-e2 transition-shadow"
              >
                <div className="shrink-0 w-11 h-11 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-title text-on-surface mb-1">{item.title}</h3>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
