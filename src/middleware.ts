import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const firstTime = req.cookies.get('didVisit')?.value
  const { pathname } = req.nextUrl;
  const token = req.nextUrl.searchParams.get('token')
  let localToken = req.cookies.get('userToken')?.value
  const business_id = req.cookies.get('BusinessID')?.value;

  if (token) {
    console.log('token exists')
    const res = NextResponse.next()
    res.cookies.set('userToken', token, {
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    })
    localToken = token; // Use the token from query if it exists
  }
  if (!localToken) {
    // Redirect to root if no token in query and no local token cookie
    if (!token) {
      console.log('token does not exist')
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  } else {
    if (business_id) {
      console.log('business_id exists')
      return NextResponse.next()
    }
    else {
      if (pathname === '/') {
        console.log('business_id does not exist, redirecting to business page')
        return NextResponse.next()
      } else {
        console.log('business_id does not exist')
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  }

  return NextResponse.next()
}

// Apply middleware to all routes EXCEPT '/' and '/welcome'
export const config = {
  matcher: [
    '/',
    '/customer-analytics/:path*',
    '/sales-analytics/:path*',
    '/orders/:path*',
    '/lennyAi/:path*',
    '/orders/:path*',
    '/products_and_services/:path*',
    '/overview/:path*',
    '/inventory/:path*'
  ],
}