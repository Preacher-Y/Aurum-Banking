import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

// Routes that logged-in users should NOT access
const PUBLIC_ONLY = ["/landing", "/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(COOKIE_NAME)?.value;

  const isPublicOnly = PUBLIC_ONLY.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  // No session → send to landing (except public routes)
  if (!session && !isPublicOnly) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  // Has session → redirect away from public-only pages
  if (session && isPublicOnly) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icons|fonts|noise\\.svg|favicon\\.ico).*)",
  ],
};
