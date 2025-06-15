import { NextResponse } from 'next/server';
import constants, { ItemsMenu } from '@utils/constants';
import AuthClient from '@common/authClient';

const allPathsAuth = ItemsMenu.filter(e => e.auth).map(e => e.path);

const authClient = AuthClient.config(constants);

export async function middleware(req) {

    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/api')) {
        const token = req.cookies.get('token');
        const {valid} = await authClient.validateToken(token);

        if (!valid) {
                const response = NextResponse.redirect(new URL('/login', req.url));
                response.cookies.delete('token');
                return response;
        }

        return NextResponse.next();

    } else {
        if (allPathsAuth.includes(pathname)) {
            const isAuth = req.cookies.get('token');
            if (!isAuth) {
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
        const response = NextResponse.next();
        response.cookies.set('current-path', req.nextUrl.pathname)
        return response;
    }

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/api/:path*'"],
}