import { NextResponse, type NextRequest } from "next/server";
import { DEVICE_COOKIE, DEVICE_COOKIE_MAX_AGE } from "@/lib/constants";

/**
 * Issues an anonymous device-id cookie on first visit so favorites/recent/
 * history can sync server-side without requiring a login. Named `proxy`
 * (not `middleware`) per the Next.js 16 rename.
 */
export function proxy(request: NextRequest) {
  if (request.cookies.has(DEVICE_COOKIE)) return NextResponse.next();

  const response = NextResponse.next();
  response.cookies.set(DEVICE_COOKIE, crypto.randomUUID(), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: DEVICE_COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
