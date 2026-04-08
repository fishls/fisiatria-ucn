import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/firebase/firestore/users";

export async function POST(request: NextRequest) {
  try {
    const { uid, fullName, email } = await request.json();
    if (!uid || !fullName || !email) {
      return NextResponse.json({ error: "uid, fullName y email son requeridos" }, { status: 400 });
    }
    await createUser(uid, fullName, email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error creating user profile:", err);
    return NextResponse.json({ error: "Error al crear perfil" }, { status: 500 });
  }
}
