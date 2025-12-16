import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/login"]; // ajuste se seu login for outra rota

function getRoleFromPath(pathname: string) {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/advogado")) return "advogado";
  if (pathname.startsWith("/recepcao")) return "recepcao";
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ignora arquivos internos
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.startsWith("/public")) {
    return NextResponse.next();
  }

  // libera rotas públicas
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const requiredRole = getRoleFromPath(pathname);

  // Se não for rota de área (admin/advogado/recepcao), deixa passar por enquanto
  if (!requiredRole) return NextResponse.next();

  // 🔐 Token precisa estar em cookie para middleware ler.
  // Como hoje você salva em localStorage, o middleware NÃO vê.
  // Solução: armazenar também um cookie "auth_token" no login (HTTP-only seria ideal, mas aqui vamos simples).
  const token = req.cookies.get("auth_token")?.value;
  const role = req.cookies.get("userRole")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
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
