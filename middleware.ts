// If your project already has a middleware file, do NOT overwrite it: merge the updateSession() call into it.
// Next.js 16: rename this file to proxy.ts and the exported function to `proxy`.
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const AUTH_PAGES = ["/login", "/signup", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (!user) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    if (pathname.startsWith("/chat") || pathname === "/reset-password") {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
  } else if (AUTH_PAGES.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/chat";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return response;
}

// Only these paths are touched. Your existing routes are unaffected.
export const config = {
  matcher: [
    "/chat/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/api/conversations/:path*",
    "/api/conversations",
    "/api/profile/:path*",
    "/api/profile",
    "/api/settings",
  ],
};
