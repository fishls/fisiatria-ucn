import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

// Crear middleware de next-intl
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

// Rutas protegidas que requieren autenticación
const protectedRoutes = [
  "/",
  "/buscar",
  "/resumen",
  "/guardados",
  "/programacion",
  "/perfil",
];

/**
 * Middleware combinado:
 * 1. Maneja internacionalización (next-intl)
 * 2. Protege las rutas verificando la cookie de sesión
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verificar si es una ruta protegida (considerando el prefijo de locale)
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  ) || locales.some(
    (locale) => protectedRoutes.some(
      (route) => pathname === `/${locale}${route}` || pathname.startsWith(`/${locale}${route}/`)
    )
  );

  // Ejecutar middleware de internacionalización primero
  const response = intlMiddleware(request);

  // Si no es ruta protegida, retornar respuesta de i18n
  if (!isProtectedRoute) {
    return response;
  }

  // Verificar autenticación para rutas protegidas
  const session = request.cookies.get("session")?.value;

  if (!session) {
    // Construir URL de login preservando el locale si existe
    const locale = locales.find((l) => pathname.startsWith(`/${l}/`)) || defaultLocale;
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    // Rutas de i18n (excluir api, _next, etc.)
    "/",
    "/(es|en)/:path*",
    // Rutas estáticas
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
