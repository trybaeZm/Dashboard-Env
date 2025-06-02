import { NextRequest, NextResponse } from 'next/server'
import { createCookie, getCookie, getOrgData } from './lib/createCookie'
import { verifyToken } from './services/token'

export function middleware(req: NextRequest) {
  const firstTime = req.cookies.get('didVisit')?.value
  const token = req.nextUrl.searchParams.get('token')
  const localToken =  req.cookies.get('userToken')?.value
  const business_id = req.cookies.get('BusinessID')?.value;

  console.log('getting local token...')

  if (localToken) {
    console.log('Verifying local token:', verifyToken(localToken))
  }
  // Handle token from query param - set cookie and redirect to root
  if (token) {
    console.log('token exists')
    const res = NextResponse.next()
    res.cookies.set('userToken', token, {
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    })
    return res
  }

  // Redirect to root if no token in query and no local token cookie
  if (!token && !localToken) {
    console.log('token does not exist')
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Redirect to root if no business ID cookie
  if (!business_id) {
    console.log('user has not selected an organisation')
    return NextResponse.redirect(new URL('/', req.url))
  }

   if (!firstTime) {
    const res = NextResponse.redirect(new URL('/welcome', req.url));
    res.cookies.set('didVisit', 'true', {
      httpOnly: true,
      secure: true, // Only secure in production
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // Optional: 1 week
    });
    return res;
  }
    

  // If none of the above conditions match, continue normally
  return NextResponse.next()
}

// Apply middleware to all routes EXCEPT '/' and '/welcome'
export const config = {
  matcher: [
    '/customer-analytics/:path*',
    '/sales-analytics/:path*',
    '/orders/:path*',
    '/lennyAi/:path*',
    '/orders/:path*'
    
  ],

}