import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("auth")
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/cadastro")

  // Se o usuário não está autenticado e tenta acessar uma página protegida
  if (!isAuthenticated && !isAuthPage && !request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Se o usuário está autenticado e tenta acessar uma página de autenticação
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
