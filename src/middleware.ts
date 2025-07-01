import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const firstTime = req.cookies.get('didVisit')?.value
  const token = req.nextUrl.searchParams.get('token')
  const localToken = req.cookies.get('userToken')?.value
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
  }

  if (!localToken) {
    // Redirect to root if no token in query and no local token cookie
    if (!token) {
      console.log('token does not exist')
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }







  // Redirect to root if no business ID cookie
  if (!business_id) {
    console.log('user has not selected an organisation')
    return NextResponse.redirect(new URL('/', req.url))
  }

  // if (!firstTime) {
  //   const res = NextResponse.redirect(new URL('/welcome', req.url));
  //   res.cookies.set('didVisit', 'true', {
  //     httpOnly: true,
  //     secure: true, // Only secure in production
  //     sameSite: 'strict',
  //     path: '/',
  //     maxAge: 60 * 60 * 24 * 7, // Optional: 1 week
  //   });
  //   return res;
  // }

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
    '/orders/:path*',
    '/products_and_services/:path*',
    '/overview/:path*'
  ],
}