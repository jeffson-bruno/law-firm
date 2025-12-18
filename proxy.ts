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

  // flags em cookie (vamos garantir no passo seguinte)
  const showFinance = req.cookies.get("show_finance")?.value === "true";

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // exceção: permitir /admin/financeiro para quem tem permissão financeira
  if (pathname.startsWith("/admin/financeiro") && showFinance) {
    return NextResponse.next();
  }

  // bloqueio padrão por role
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
