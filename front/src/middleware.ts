import { NextRequest, NextResponse } from 'next/server'


let firstTime = true // Resets on server restart
export function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Prevent redirect loop: If the user is already on /welcome, allow access
  if (url.pathname === '/welcome') {
    return NextResponse.next()
  }

  // Redirect only if it's the first visit
  if (firstTime) {
    console.log('first time')
    firstTime = false // Mark as visited
    return NextResponse.redirect(new URL('/welcome', req.url))
  }

  return NextResponse.next() // Continue request normally
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
}