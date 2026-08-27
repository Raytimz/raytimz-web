import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname === '/ru'
    || request.nextUrl.pathname.startsWith('/ru/')
    ? 'ru'
    : 'en';

  requestHeaders.set('x-raytimz-locale', locale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|icon.png|og.png).*)'],
};
