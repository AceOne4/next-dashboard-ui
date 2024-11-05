// middleware.js
// protect Routes using middleware
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session) return NextResponse.redirect(new URL("login", req.url));
  if (session.user.role !== req.nextUrl.pathname.slice(1)) {
    return NextResponse.redirect(new URL(`${session?.user.role}`, req.url));
  }

  return NextResponse.next();
}

// Apply to specific routes (optional)
export const config = {
  matcher: ["/student", "/admin", "/parent", "/teacher"], // Protect specific routes
};
