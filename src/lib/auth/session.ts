import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";

export type SessionUser = {
  uid:   string;
  email: string;
  name:  string;
};

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore   = cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, true);
    return {
      uid:   decoded.uid,
      email: decoded.email ?? "",
      name:  decoded.name  ?? "",
    };
  } catch {
    return null;
  }
}
