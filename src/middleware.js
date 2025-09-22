// ./src/middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const locales = ['fr', 'en'];
  const defaultLocale = 'fr';

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Don't change the URL of Next.js assets starting with _next
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};