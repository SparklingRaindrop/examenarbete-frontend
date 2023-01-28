import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPages = ['/user/new', '/login', '/'];

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const user = request.cookies.get('user')?.value;
    const isProtectedRoute = !publicPages.some(page => page === request.nextUrl.pathname);

    if (isProtectedRoute && !accessToken) {
        request.cookies.delete('accessToken');
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('accessToken');
        return response;
    }

    if (publicPages.includes(request.nextUrl.pathname) && accessToken) {
        return NextResponse.redirect(new URL('/user', request.url));
    }
}

export const config = {
    matcher: ['/user/(.*)', '/login', '/user'],
};