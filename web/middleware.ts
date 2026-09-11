import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/sessions", "/upload", "/onboarding"];

export default auth((req) => {
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix)
  );
  const isLoggedIn = !!req.auth?.user;

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*", "/sessions/:path*", "/upload/:path*", "/onboarding/:path*"],
};