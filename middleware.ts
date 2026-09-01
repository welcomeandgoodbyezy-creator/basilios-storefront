import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow the login page to be accessed freely
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Check for the auth cookie
    const authCookie = request.cookies.get('admin_auth')
    
    // If no cookie or wrong password, redirect to login
    if (!authCookie || authCookie.value !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}