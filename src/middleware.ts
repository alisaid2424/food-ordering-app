/* import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import routes from "./utils/routes";

export default withAuth(
  async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const role = token?.role;
    const pathname = request.nextUrl.pathname;

    const isAuthPage = [routes.login, routes.register].some((route) =>
      pathname.startsWith(route)
    );
    const protectedRoutes = [routes.profile, routes.admin];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isAdminRoute = pathname.startsWith(routes.admin);

    // Redirect unauthenticated users trying to access protected routes to login
    if (!token && isProtectedRoute) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }

    // Redirect authenticated users away from login/register pages
    if (token && isAuthPage) {
      const destination =
        role === UserRole.ADMIN ? routes.admin : routes.profile;
      return NextResponse.redirect(new URL(destination, request.url));
    }

    // Prevent non-admin users from accessing admin routes
    if (token && isAdminRoute && role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL(routes.profile, request.url));
    }

    // Redirect admin users to the admin dashboard right after login
    const fromLogin = request.headers.get("referer")?.includes(routes.login);
    if (token && role === UserRole.ADMIN && !isAdminRoute && fromLogin) {
      return NextResponse.redirect(new URL(routes.admin, request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

// Apply middleware to all routes except API, static files, and public assets
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
 */

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import routes from "./utils/routes";

// Step 1: Setup next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Step 2: Combine with next-auth middleware
const authMiddleware = withAuth(
  async function middleware(request: NextRequest) {
    // Handle locale using next-intl middleware
    const intlResponse = intlMiddleware(request);
    if (intlResponse.headers.get("x-nextjs-redirect")) {
      // Stop here if intl redirects (e.g. missing locale)
      return intlResponse;
    }

    const token = await getToken({ req: request });
    const role = token?.role;
    const pathname = request.nextUrl.pathname;
    const localeMatch = pathname.match(/^\/(ar|en)(\/|$)/);
    const locale = localeMatch?.[1] || "en";

    // Auth and Admin Logic
    const isAuthPage = [routes.login, routes.register].some((route) =>
      pathname.startsWith(`/${locale}${route}`)
    );

    const protectedRoutes = [routes.profile, routes.admin];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(`/${locale}${route}`)
    );

    const isAdminRoute = pathname.startsWith(`/${locale}${routes.admin}`);

    if (!token && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/${locale}${routes.login}`, request.url)
      );
    }

    if (token && isAuthPage) {
      const destination =
        role === UserRole.ADMIN ? routes.admin : routes.profile;
      return NextResponse.redirect(
        new URL(`/${locale}${destination}`, request.url)
      );
    }

    if (token && isAdminRoute && role !== UserRole.ADMIN) {
      return NextResponse.redirect(
        new URL(`/${locale}${routes.profile}`, request.url)
      );
    }

    const fromLogin = request.headers.get("referer")?.includes(routes.login);
    if (token && role === UserRole.ADMIN && !isAdminRoute && fromLogin) {
      return NextResponse.redirect(
        new URL(`/${locale}${routes.admin}`, request.url)
      );
    }

    // If all checks passed, continue to the requested page
    return intlResponse;
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export default authMiddleware;

// Step 3: Configure the matcher for both intl and auth
export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|_vercel|.*\\..*).*)",
  ],
};
