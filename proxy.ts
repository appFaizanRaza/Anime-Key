import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const nextAuthToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const customToken = request.cookies.get("auth-token")?.value;

  const isLoggedIn = !!nextAuthToken || !!customToken;

  const { pathname } = request.nextUrl;

  // 1️⃣ Not logged in → block homepage
  if (!isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2️⃣ Logged-in user should not see login page
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};