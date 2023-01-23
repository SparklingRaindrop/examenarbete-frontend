import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPages = ['/user/new'];

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;

    if (
        !publicPages.some(page => page === request.nextUrl.pathname) &&
        (request.nextUrl.pathname.startsWith('/user') && !accessToken)
    ) {
        request.cookies.delete('access_token');
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');

        return response;
    }

    if (['/login'].includes(request.nextUrl.pathname) && accessToken) {
        return NextResponse.redirect(new URL('/user', request.url));
    }
}

export const config = {
    matcher: ['/user/(.*)', '/login', '/user'],
};