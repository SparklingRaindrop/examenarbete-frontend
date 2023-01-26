import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPages = ['/user/new'];

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const user = request.cookies.get('user')?.value;
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/user') &&
        !publicPages.some(page => page === request.nextUrl.pathname);

    if (isProtectedRoute && !accessToken) {

        if (!user) {
            request.cookies.delete('accessToken');
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('accessToken');
            return response;
        }
    }

    if (['/login'].includes(request.nextUrl.pathname) && accessToken) {
        return NextResponse.redirect(new URL('/user/groceries', request.url));
    }
}

export const config = {
    matcher: ['/user/(.*)', '/login', '/user'],
};