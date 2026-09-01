import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    if (password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })
      
      // Set secure, HTTP-only cookie (prevents XSS theft)
      response.cookies.set('admin_auth', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })
      
      return response
    }
    
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}