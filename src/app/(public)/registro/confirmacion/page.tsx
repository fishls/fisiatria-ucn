"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Button } from "@/components/ui";

const STEP_DOTS = [
  { done: true },
  { done: true },
  { done: true, active: true },
];

type RegData = {
  fullName: string;
  email:    string;
  password: string;
};

export default function RegistroConfirmacionPage() {
  const router = useRouter();
  const [data,    setData]    = useState<RegData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  useEffect(() => {
    const fullName = sessionStorage.getItem("reg_fullName") ?? "";
    const email    = sessionStorage.getItem("reg_email")    ?? "";
    const password = sessionStorage.getItem("reg_password") ?? "";

    if (!fullName || !email || !password) {
      // Faltan datos — volver al inicio del registro
      router.replace("/registro");
      return;
    }
    setData({ fullName, email, password });
  }, [router]);

  async function handleRegister() {
    if (!data || loading) return;
    setLoading(true);
    setError("");

    try {
      // 1. Crear usuario en Firebase Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, { displayName: data.fullName });

      // 2. Crear perfil en Firestore
      await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, fullName: data.fullName, email: data.email }),
      });

      // 3. Obtener ID token y crear cookie de sesión en el servidor
      const idToken = await user.getIdToken();
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) throw new Error("Error al crear sesión");

      // 3. Limpiar sessionStorage y redirigir al dashboard
      sessionStorage.removeItem("reg_fullName");
      sessionStorage.removeItem("reg_email");
      sessionStorage.removeItem("reg_password");

      router.replace("/");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/email-already-in-use") {
        setError("Este correo ya tiene una cuenta. Inicia sesión.");
      } else {
        setError("Ocurrió un error. Intenta de nuevo.");
      }
      setLoading(false);
    }
  }

  if (!data) return null;

  return (
    <div className="min-h-dvh flex flex-col bg-surface">
      {/* Minimal header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-outline-variant/20">
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">school</span>
          <span className="font-headline font-extrabold tracking-tighter text-primary text-2xl">
            Fisiatría UCN
          </span>
        </Link>
        <span className="text-on-surface-variant text-sm font-medium hidden md:block">
          Registro de nuevos usuarios
        </span>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 pt-12 pb-24 flex-1">

        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-[11px]">
                Paso 3 de 3
              </span>
              <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mt-1">
                Finalización
              </h1>
            </div>
            <div className="flex gap-2">
              {STEP_DOTS.map((dot, i) => (
                <div
                  key={i}
                  className={[
                    "h-2 rounded-full transition-all",
                    dot.active
                      ? "w-24 bg-primary shadow-[0_0_12px_rgba(247,147,29,0.4)]"
                      : "w-12 bg-secondary-container",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
          <div className="bg-surface-container-high h-1.5 w-full rounded-full overflow-hidden">
            <div className="bg-primary h-full w-full transition-all duration-700" />
          </div>
        </div>

        {/* Success callout */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-8 mb-10 shadow-card">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container opacity-10 rounded-bl-full" />
          <div className="flex items-start gap-6">
            <div className="bg-primary/10 p-4 rounded-xl shrink-0">
              <span
                className="material-symbols-outlined text-primary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                task_alt
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-headline font-bold text-on-surface">
                ¡Casi listo! Revisa tu resumen
              </h2>
              <p className="text-on-surface-variant mt-2 max-w-lg leading-relaxed">
                Verifica que todos los datos ingresados sean correctos antes de finalizar el
                proceso de registro en la plataforma de investigación clínica.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Personal info */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-secondary">person</span>
              <h3 className="font-bold tracking-tight text-lg">Información Personal</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {[
                { label: "Nombre Completo",      value: data.fullName },
                { label: "Correo Institucional", value: data.email },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest font-semibold mb-1">
                    {label}
                  </p>
                  <p className="text-on-surface font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative rounded-2xl overflow-hidden h-48 md:h-full bg-surface-container-low">
            <Image
              src="https://placehold.co/600x400/006591/ffffff?text=Fisiatría+UCN"
              alt="Laboratorio de investigación"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <p className="text-white text-sm font-medium">Integridad y Excelencia Académica</p>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-error-container/20 text-error px-5 py-4 rounded-xl">
            <span className="material-symbols-outlined shrink-0">error</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Action area */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-surface-container-highest pt-10">
          <Link
            href="/registro/seguridad"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors font-bold px-4 py-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Modificar información
          </Link>
          <Button
            variant="primary"
            size="lg"
            shape="rounded"
            className="shadow-[0_8px_20px_rgba(247,147,29,0.3)] hover:shadow-[0_12px_24px_rgba(247,147,29,0.4)]"
            disabled={loading}
            onClick={handleRegister}
          >
            {loading ? "Creando cuenta…" : "Completar Registro"}
          </Button>
        </div>
      </main>

      <div className="h-8" />
    </div>
  );
}
