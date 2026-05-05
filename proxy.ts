import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const isAuthenticated = token === process.env.AUTH_TOKEN

  if (request.nextUrl.pathname.startsWith('/chat')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (request.nextUrl.pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/chat', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/chat/:path*'],
}
