import * as admin from "firebase-admin";

function getAdminApp() {
  if (admin.apps.length > 0) return admin.apps[0]!;

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export function getAdminAuth() {
  return getAdminApp().auth();
}

export function getAdminDb() {
  return getAdminApp().firestore();
}
