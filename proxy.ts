import { NextRequest, NextResponse } from "next/server";

// Routes that logged-in users should NOT access
const PUBLIC_ONLY = ["/landing", "/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieName = process.env.APPWRITE_COOKIE_ID;
  const session = cookieName ? request.cookies.get(cookieName)?.value : undefined;

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
