import * as admin from "firebase-admin";

function initAdmin() {
  if (admin.apps.length > 0) return admin.apps[0]!;

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

initAdmin();

export const adminAuth = admin.auth();
export const adminDb   = admin.firestore();
