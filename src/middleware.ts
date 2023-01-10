import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (['/user'].includes(request.nextUrl.pathname) &&
        (!token || Date.now() > JSON.parse(token).expiredAt)
    ) {
        request.cookies.delete('token');
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
    }

    if (['/login'].includes(request.nextUrl.pathname) && token) {
        return NextResponse.redirect(new URL('/user', request.url));
    }
}

export const config = {
    matcher: ['/user', '/login'],
};