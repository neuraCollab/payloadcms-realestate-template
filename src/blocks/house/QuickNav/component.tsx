import React from 'react'
import Link from 'next/link'
import {
  Home,
  Briefcase,
  Trees,
  Building,
  Search,
  Users,
  Newspaper,
  Mail,
  MapPin as MapIcon,
  Star,
  Info,
  Phone,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  briefcase: Briefcase,
  trees: Trees,
  building: Building,
  search: Search,
  users: Users,
  newspaper: Newspaper,
  mail: Mail,
  map: MapIcon,
  star: Star,
  info: Info,
  phone: Phone,
}

type Accent = 'primary' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet'

const ACCENT_BG: Record<Accent, string> = {
  primary: 'bg-primary/10 text-primary',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
  sky: 'bg-sky-100 text-sky-700',
  violet: 'bg-violet-100 text-violet-700',
}

export type QuickNavBlockType = {
  blockType: 'quick-nav'
  label?: string
  title: string
  subtitle?: string
  items: Array<{
    icon: keyof typeof ICONS
    title: string
    description?: string
    href: string
    accent?: Accent
  }>
}

export const QuickNavBlock: React.FC<QuickNavBlockType> = ({ label, title, subtitle, items }) => {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          {label ? (
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-label font-medium">
              {label}
            </span>
          ) : null}
          <h2 className="text-headline md:text-display text-on-surface">{title}</h2>
          {subtitle ? (
            <p className="text-body text-on-surface-variant max-w-2xl mx-auto">{subtitle}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(items ?? []).map((item, i) => {
            const Icon = ICONS[item.icon] ?? Home
            const accentClass = ACCENT_BG[item.accent ?? 'primary']
            return (
              <Link
                key={i}
                href={item.href}
                className="group relative bg-card rounded-md shadow-e1 p-5 hover:shadow-e2 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center mb-4 ${accentClass}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-title text-on-surface group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                    {item.description}
                  </p>
                ) : null}
                <ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
