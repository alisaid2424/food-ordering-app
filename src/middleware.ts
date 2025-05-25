import { NextRequest, NextResponse } from "next/server";
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
