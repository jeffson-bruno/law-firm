import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getRoleFromPath(pathname: string) {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/advogado")) return "advogado";
  if (pathname.startsWith("/recepcao")) return "recepcao";
  return null;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const requiredRole = getRoleFromPath(pathname);
  if (!requiredRole) return NextResponse.next();

  const token = req.cookies.get("auth_token")?.value;
  const role = req.cookies.get("userRole")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (role && role !== requiredRole) {
    const url = req.nextUrl.clone();
    url.pathname = `/${role}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/advogado/:path*", "/recepcao/:path*"],
};
