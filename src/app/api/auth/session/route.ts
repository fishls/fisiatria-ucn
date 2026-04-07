import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

const SESSION_COOKIE_NAME = "session";
const EXPIRES_IN = 60 * 60 * 24 * 14 * 1000; // 14 días en ms

// POST /api/auth/session — intercambia un ID token por una cookie de sesión
export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    if (!idToken) {
      return NextResponse.json({ error: "idToken requerido" }, { status: 400 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: EXPIRES_IN,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      maxAge: EXPIRES_IN / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}

// DELETE /api/auth/session — cierra la sesión revocando la cookie
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    maxAge: 0,
    path: "/",
  });
  return response;
}
