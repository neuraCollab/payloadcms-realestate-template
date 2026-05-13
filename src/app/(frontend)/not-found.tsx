import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-display text-on-surface">404</p>
        <p className="text-body text-on-surface-variant">Страница не найдена</p>
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  )
}
