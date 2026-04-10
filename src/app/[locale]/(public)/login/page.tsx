"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import CenteredFormLayout from "@/components/shell/CenteredFormLayout";
import { Button } from "@/components/ui";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const t = useTranslations("auth");
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const idToken  = await user.getIdToken();

      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) throw new Error("Error al crear sesión");

      const redirect = searchParams.get("redirect") ?? "/";
      router.replace(redirect);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/invalid-credential" || code === "auth/user-not-found") {
        setError(t("invalidCredentials"));
      } else {
        setError(t("loginError"));
      }
      setLoading(false);
    }
  }

  return (
    <CenteredFormLayout
      visual={{
        imageSrc: "https://placehold.co/600x800/006591/ffffff?text=Fisiatría+UCN",
        imageAlt: "Plataforma de investigación UCN",
        headline: t("welcomeBack"),
        description: t("loginDescription"),
      }}
      step={{
        currentStep: 0,
        totalSteps: 1,
        stepLabel: t("stepLabel"),
        title: t("login"),
      }}
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-bold text-on-surface-variant tracking-wide uppercase px-1">
            {t("institutionalEmail")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ucn.cl"
            required
            className="w-full bg-surface-container-high border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-xl py-4 px-5 text-on-surface placeholder:text-outline transition-all"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-bold text-on-surface-variant tracking-wide uppercase px-1">
            {t("password")}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("enterPassword")}
              required
              className="w-full bg-surface-container-high border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-xl py-4 px-5 pr-12 text-on-surface placeholder:text-outline transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label={showPw ? t("hidePassword") : t("showPassword")}
            >
              <span className="material-symbols-outlined">{showPw ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-error text-sm px-1">
            <span className="material-symbols-outlined text-base">error</span>
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 pt-2">
          <Button
            variant="primary"
            size="lg"
            shape="rounded"
            type="submit"
            disabled={loading}
            className="w-full shadow-lg"
          >
            {loading ? t("signingIn") : t("signIn")}
          </Button>
          <p className="text-center text-sm text-on-surface-variant">
            {t("noAccount")}{" "}
            <Link href="/registro" className="text-secondary font-bold hover:underline">
              {t("registerHere")}
            </Link>
          </p>
        </div>
      </form>
    </CenteredFormLayout>
  );
}
