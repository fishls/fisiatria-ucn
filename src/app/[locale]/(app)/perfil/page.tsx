"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ToggleSwitch } from "@/components/ui";
import { auth, db } from "@/lib/firebase/client";

type ProfileState = {
  fullName:    string;
  email:       string;
  institution: string;
  avatarUrl:   string | null;
};

export default function PerfilPage() {
  const t = useTranslations("profile");
  const router = useRouter();
  const [profile,    setProfile]    = useState<ProfileState | null>(null);
  const [notifNew,   setNotifNew]   = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) { router.replace("/login"); return; }

      setProfile({
        fullName:    firebaseUser.displayName ?? "Usuario UCN",
        email:       firebaseUser.email       ?? "",
        institution: "Fisiatría UCN",
        avatarUrl:   firebaseUser.photoURL,
      });

      // Load preferences from Firestore
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      if (snap.exists()) {
        const prefs = snap.data().preferences ?? {};
        setNotifNew(prefs.notificationsNewAbstracts ?? true);
        setNotifEmail(prefs.weeklyEmailDigest       ?? false);
      }
    });
    return unsub;
  }, [router]);

  async function savePreferences(key: string, value: boolean) {
    const user = auth.currentUser;
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid), { [`preferences.${key}`]: value });
  }

  async function handleLogout() {
    await signOut(auth);
    await fetch("/api/auth/session", { method: "DELETE" });
    router.replace("/login");
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="material-symbols-outlined text-4xl text-outline animate-spin">progress_activity</span>
      </div>
    );
  }

  const user = profile;

  const securityItems = [
    { icon: "lock",           label: t("security.changePassword") },
    { icon: "fingerprint",    label: t("security.twoFactor") },
    { icon: "visibility_off", label: t("security.privacy") },
  ];

  return (
    <>
      {/* Profile header */}
      <section className="flex flex-col items-center text-center space-y-4 mb-10 max-w-2xl mx-auto">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-sm bg-surface-container-low flex items-center justify-center relative">
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.fullName} fill sizes="128px" className="object-cover" />
            ) : (
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "4rem" }}>
                person
              </span>
            )}
          </div>
          <button
            className="absolute bottom-1 right-1 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-105 active:scale-90 transition-transform"
            aria-label={t("changePhoto")}
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              edit
            </span>
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-headline font-extrabold tracking-tight text-on-surface">
            {user.fullName}
          </h1>
          <p className="text-secondary font-medium">{t("specialty")}</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Personal information */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">
            {t("personalInfo")}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-surface-container-lowest p-5 rounded-xl">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
                {t("fullName")}
              </label>
              <input
                type="text"
                defaultValue={user.fullName}
                className="w-full bg-transparent border-none p-0 text-on-surface font-semibold focus:ring-0 text-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-surface-container-lowest p-5 rounded-xl">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
                  {t("email")}
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full bg-transparent border-none p-0 text-on-surface font-semibold focus:ring-0"
                />
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-xl">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
                  {t("institution")}
                </label>
                <input
                  type="text"
                  defaultValue={user.institution}
                  className="w-full bg-transparent border-none p-0 text-on-surface font-semibold focus:ring-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Academic interests — placeholder until specialty management UI is built */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">
            {t("interests")}
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="border-2 border-dashed border-outline-variant text-outline p-2 rounded-full hover:bg-surface-container-low transition-colors"
              aria-label={t("addSpecialty")}
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">
            {t("preferences")}
          </h2>
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden divide-y divide-surface-container">
            <ToggleSwitch
              icon="notifications"
              iconVariant="primary"
              label={t("notifications.newAbstracts")}
              description={t("notifications.newAbstractsDesc")}
              checked={notifNew}
              onChange={(v) => { setNotifNew(v); savePreferences("notificationsNewAbstracts", v); }}
            />
            <ToggleSwitch
              icon="mail"
              iconVariant="secondary"
              label={t("notifications.weeklyDigest")}
              description={t("notifications.weeklyDigestDesc")}
              checked={notifEmail}
              onChange={(v) => { setNotifEmail(v); savePreferences("weeklyEmailDigest", v); }}
            />
          </div>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant px-1">
            {t("security.title")}
          </h2>
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden">
            {securityItems.map(({ icon, label }, i) => (
              <div key={label}>
                {i > 0 && <div className="h-px bg-surface-container mx-5" />}
                <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
                    <span className="font-bold text-on-surface">{label}</span>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={handleLogout}
          className="w-full py-4 rounded-xl border-2 border-error/30 text-error font-bold hover:bg-error/5 transition-colors"
        >
          {t("logout")}
        </button>
      </div>
    </>
  );
}
