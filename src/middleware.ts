import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;
    const sessionToken = request.cookies.get('session_token')?.value;

    if (request.nextUrl.pathname.startsWith('/user') &&
        (!sessionToken || !accessToken)
    ) {
        request.cookies.delete('access_token');
        request.cookies.delete('session_token');
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');
        response.cookies.delete('session_token');
        return response;
    }

    if (['/login'].includes(request.nextUrl.pathname) && accessToken && sessionToken) {
        return NextResponse.redirect(new URL('/user', request.url));
    }
}

export const config = {
    matcher: ['/user/(.*)', '/login', '/user'],
};