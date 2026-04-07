import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy — protege las rutas (app) verificando la cookie de sesión de Firebase.
 * La verificación criptográfica real ocurre en el servidor (adminAuth).
 * Aquí solo comprobamos que la cookie exista para redirigir rápido; la
 * validación completa se hace en los Server Components / Route Handlers.
 */
export function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/buscar/:path*",
    "/resumen/:path*",
    "/guardados/:path*",
    "/programacion/:path*",
    "/perfil/:path*",
  ],
};
