import type { UserProfile } from "@/types";
import { adminDb } from "@/lib/firebase/admin";
import { firestore } from "firebase-admin";
const { FieldValue } = firestore;

const COL = "users";

export type UserDoc = Omit<UserProfile, "id"> & {
  savedAbstractIds: string[];
  savedSeminarIds:  string[];
  createdAt:        FirebaseFirestore.FieldValue;
};

export async function getUserById(uid: string): Promise<UserProfile | null> {
  const doc = await adminDb.collection(COL).doc(uid).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  return {
    id:           uid,
    fullName:     data.fullName,
    email:        data.email,
    institution:  data.institution,
    role:         data.role,
    avatarUrl:    data.avatarUrl ?? null,
    specialties:  data.specialties ?? [],
    preferences:  data.preferences ?? { notificationsNewAbstracts: true, weeklyEmailDigest: false },
  };
}

export async function createUser(uid: string, fullName: string, email: string): Promise<void> {
  await adminDb.collection(COL).doc(uid).set({
    fullName,
    email,
    institution:      "Fisiatría UCN",
    role:             "Especialista en Fisiatría",
    avatarUrl:        null,
    specialties:      [],
    preferences: {
      notificationsNewAbstracts: true,
      weeklyEmailDigest:         false,
    },
    savedAbstractIds: [],
    savedSeminarIds:  [],
    createdAt:        FieldValue.serverTimestamp(),
  });
}

export async function getSavedAbstractIds(uid: string): Promise<string[]> {
  try {
    const doc = await adminDb.collection(COL).doc(uid).get();
    if (!doc.exists) return [];
    return doc.data()?.savedAbstractIds ?? [];
  } catch { return []; }
}

export async function getSavedSeminarIds(uid: string): Promise<string[]> {
  try {
    const doc = await adminDb.collection(COL).doc(uid).get();
    if (!doc.exists) return [];
    return doc.data()?.savedSeminarIds ?? [];
  } catch { return []; }
}
