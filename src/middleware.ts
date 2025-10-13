import { NextRequest, NextResponse } from 'next/server'
import { checkSub } from './services/subscription/subscriptionService'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.nextUrl.searchParams.get('token')
  let localToken = req.cookies.get('userToken')?.value
  const business_id = req.cookies.get('BusinessID')?.value
  const userData = req.cookies.get('userData')?.value
  const path = req.nextUrl.pathname;

  // cookies for visit count
  const firstTime = req.cookies.get('didVisit')?.value
  const showAdd = req.cookies.get('showAdd')?.value

  const res = NextResponse.next()

  // 🔹 Step 1: Handle token from query
  if (token) {
    console.log('Token exists')
    res.cookies.set('userToken', token, {
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    localToken = token
  }

  // 🔹 Step 2: Redirect if no token found
  if (!localToken && !token) {
    console.log('Token does not exist')
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  // 🔹 Step 3: Check subscription
  const userId = userData ? JSON.parse(userData).id : null
  // const userData = await checkSub(userId)

  let parsedUserData: any = userData ? JSON.parse(userData) : null;
  console.log(userData)



  // checkeverywhere else but not on root

  // ✅ Skip check for home route "/"
  if (path === "/") {
    // return NextResponse.next();
    console.log('wont run check on root')
  } else {
    if (!parsedUserData) {
      console.log('No user data found')
    } else if (!parsedUserData.hasSubscription) {
      console.log('No subscription found')
      // Set visit cookie (24h)
      res.cookies.set('didVisit', 'true', {
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })

      // Show ad logic
      if (!firstTime) {
        console.log('Not first time visit')
        res.cookies.set('showAdd', 'show', {
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24, // 24 hours
          path: '/',
        })
      } else {
        console.log('First time visit')
        if (!showAdd) {
          res.cookies.set('showAdd', 'show', {
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
          })
        }
      }

      return NextResponse.redirect(new URL('/', req.url))

    } else {
      console.log('User has active subscription')
    }
  }

  // 🔹 Step 4: Check business_id cookie
  if (business_id) {
    console.log('Business ID exists')
    return res
  } else {
    if (pathname === '/') {
      console.log('Business ID missing — staying on root')
      return res
    } else {
      console.log('Business ID missing — redirecting to root')
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}

// ✅ Apply middleware to these routes
export const config = {
  matcher: [
    '/',
    '/customer-analytics/:path*',
    '/sales-analytics/:path*',
    '/orders/:path*',
    '/lennyAi/:path*',
    '/products_and_services/:path*',
    '/overview/:path*',
    '/inventory/:path*',
  ],
}
