import type { Seminar } from "@/types";
import { getAdminDb } from "@/lib/firebase/admin";

const COL = "seminars";

function toSeminar(id: string, data: FirebaseFirestore.DocumentData): Seminar {
  return {
    id,
    href: `/programacion/${id}`,
    ...(data as Omit<Seminar, "id" | "href">),
  };
}

export async function getAllSeminars(): Promise<Seminar[]> {
  try {
    const snap = await getAdminDb().collection(COL).orderBy("date", "asc").get();
    return snap.docs.map((d) => toSeminar(d.id, d.data()));
  } catch { return []; }
}

export async function getSeminarById(id: string): Promise<Seminar | undefined> {
  try {
    const doc = await getAdminDb().collection(COL).doc(id).get();
    if (!doc.exists) return undefined;
    return toSeminar(doc.id, doc.data()!);
  } catch { return undefined; }
}

export async function getSavedSeminars(savedIds: string[]): Promise<Seminar[]> {
  if (!savedIds.length) return [];
  const all = await getAllSeminars();
  return all.filter((s) => savedIds.includes(s.id));
}
