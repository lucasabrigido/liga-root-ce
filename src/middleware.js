import { NextResponse } from 'next/server';

export function middleware(request) {
    const response = NextResponse.next()
    response.cookies.set('current-path', request.nextUrl.pathname)
    return response
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}