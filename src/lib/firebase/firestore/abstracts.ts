import type { Abstract, SearchFilters } from "@/types";
import { getAdminDb } from "@/lib/firebase/admin";

const COL = "abstracts";

function toAbstract(id: string, data: FirebaseFirestore.DocumentData): Abstract {
  return {
    id,
    href: `/resumen/${id}`,
    ...(data as Omit<Abstract, "id" | "href">),
  };
}

export async function getAllAbstracts(): Promise<Abstract[]> {
  try {
    const snap = await getAdminDb().collection(COL).orderBy("publishedAt", "desc").get();
    return snap.docs.map((d) => toAbstract(d.id, d.data()));
  } catch { return []; }
}

export async function getAbstractById(id: string): Promise<Abstract | undefined> {
  try {
    const doc = await getAdminDb().collection(COL).doc(id).get();
    if (!doc.exists) return undefined;
    return toAbstract(doc.id, doc.data()!);
  } catch { return undefined; }
}

export async function getFeaturedAbstract(): Promise<Abstract | undefined> {
  try {
    const snap = await getAdminDb().collection(COL).where("featured", "==", true).limit(1).get();
    if (!snap.empty) return toAbstract(snap.docs[0].id, snap.docs[0].data());

    const fallback = await getAdminDb().collection(COL).orderBy("publishedAt", "desc").limit(1).get();
    if (fallback.empty) return undefined;
    return toAbstract(fallback.docs[0].id, fallback.docs[0].data());
  } catch { return undefined; }
}

export async function getDashboardAbstracts(): Promise<Abstract[]> {
  try {
    const snap = await getAdminDb()
      .collection(COL)
      .where("featured", "==", false)
      .orderBy("publishedAt", "desc")
      .limit(4)
      .get();
    return snap.docs.map((d) => toAbstract(d.id, d.data()));
  } catch { return []; }
}

export async function searchAbstracts(filters: Partial<SearchFilters>): Promise<Abstract[]> {
  let results = await getAllAbstracts();

  if (filters.keywords) {
    const kw = filters.keywords.toLowerCase();
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(kw) ||
        a.excerpt.toLowerCase().includes(kw) ||
        a.keywords.some((k) => k.toLowerCase().includes(kw)),
    );
  }

  if (filters.journals?.length) {
    results = results.filter((a) => filters.journals!.includes(a.journal));
  }

  if (filters.dateFrom) {
    results = results.filter((a) => a.publishedAt >= filters.dateFrom!);
  }

  if (filters.dateTo) {
    results = results.filter((a) => a.publishedAt <= filters.dateTo!);
  }

  return results;
}
