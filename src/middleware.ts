import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Публичные роуты внутри /cabinet, доступные гостям (неавторизованным пользователям)
  const publicRoutes = ['/cabinet/login', '/cabinet/favorites', '/cabinet/recent']

  // Если это один из публичных роутов, разрешаем доступ
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Проверяем наличие куки авторизации
  const email = request.cookies.get('realty_email')?.value

  // Если пользователь не авторизован, редиректим на страницу входа
  if (!email) {
    const loginUrl = new URL('/cabinet/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Применяем middleware только к роутам кабинета
  matcher: ['/cabinet/:path*'],
}
