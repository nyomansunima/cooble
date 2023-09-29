import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * Protect the pages and routes from
 * unexpected situation
 *
 * @param req incoming request
 * @returns {NextResponse}
 */
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const authToken = await getToken({ req })

  if (authToken && pathname.includes('/signin')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

/** Configuration to activate this middleware */
export const config = {
  matcher: ['/signin/:path*', '/verify-email/:path*'],
}
