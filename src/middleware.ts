import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PATH = "/";
const LOGIN_PATH = "/auth/login";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("ACCESS_TOKEN");
  const role = request.cookies.get("ROLE")?.value;

  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  if (!token && pathname.startsWith(AUTH_PATH)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (role === "EMPLOYEE" && pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
