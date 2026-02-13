import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // 1️⃣ Not logged in → homepage block
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2️⃣ Logged-in user should not see login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3️⃣ Everything else allowed
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
