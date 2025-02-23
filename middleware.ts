import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const protectedRoutes = ["/user/account", "/user/checkoutone", "/user/checkout"];
const adminRoutes = ["/admin"];

export default withAuth(
  function middleware(request) {
    const userRole = request.nextauth.token?.roles || [];

    const isProtected = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    const isAdminRoute = adminRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !request.nextauth.token) {
      // Redirect unauthenticated users to the sign-in page
      const absoluteURL = new URL("/user/signin", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (isAdminRoute && !userRole.includes("ADMIN")) {
      // Redirect non-admin users to the home page
      const absoluteURL = new URL("/", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access if the user is authenticated
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};