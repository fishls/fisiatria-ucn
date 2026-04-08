import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";

export type SessionUser = {
  uid:   string;
  email: string;
  name:  string;
};

/**
 * Reads and verifies the Firebase session cookie from the current request.
 * Returns null if the session is missing or invalid.
 * Use in Server Components and Route Handlers.
 */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore    = cookies();
  const sessionCookie  = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      uid:   decoded.uid,
      email: decoded.email  ?? "",
      name:  decoded.name   ?? "",
    };
  } catch {
    return null;
  }
}
