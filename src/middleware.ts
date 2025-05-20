import { NextRequest, NextResponse } from 'next/server'
import { createCookie, getCookie } from './lib/createCookie'
import { verifyToken } from './services/token'

export function middleware(req: NextRequest) {
  const firstTime = req.cookies.get('didVisit')?.value
  const token = req.nextUrl.searchParams.get('token')
  const localToken = getCookie()

  
  const res = NextResponse.redirect(new URL('/welcome', req.url))

  console.log('getting local token:', localToken)

  if (localToken) {
    console.log(verifyToken(localToken))
  }
 
  if (token) {
    const res = NextResponse.next() // create the response object first
    // Set the token cookie
    res.cookies.set('userToken', token, {
      secure: true,
      sameSite: 'strict', // lowercase!
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    })
  }

  if(!token){
    NextResponse.redirect(new URL('/', req.url))
  }

  if (!firstTime && req.nextUrl.pathname !== '/welcome') {
    res.cookies.set('didVisit', 'true', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    return res
  }

  return NextResponse.next()
}

// Apply middleware to the root path only, or adjust as needed
export const config = {
  matcher: [
    '/((?!welcome|login|register|about|api).*)',
  ],
}