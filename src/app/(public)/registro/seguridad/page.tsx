"use client";

import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";
import CenteredFormLayout from "@/components/shell/CenteredFormLayout";
import { Button } from "@/components/ui";

type Rule = { label: string; check: (pw: string) => boolean };

const RULES: Rule[] = [
  { label: "Mínimo 8 caracteres",            check: (pw) => pw.length >= 8 },
  { label: "Al menos una letra mayúscula",   check: (pw) => /[A-Z]/.test(pw) },
  { label: "Al menos un número",             check: (pw) => /\d/.test(pw) },
];

export default function RegistroSeguridadPage() {
  const [password, setPassword]   = useState("");
  const [confirm,  setConfirm]    = useState("");
  const [showPw,   setShowPw]     = useState(false);
  const [showCf,   setShowCf]     = useState(false);

  const allValid   = RULES.every((r) => r.check(password));
  const matches    = password === confirm && confirm !== "";
  const canSubmit  = allValid && matches;

  return (
    <CenteredFormLayout
      visual={{
        imageSrc: "https://placehold.co/600x800/006591/ffffff?text=Seguridad+UCN",
        imageAlt: "Seguridad clínica",
        headline: "Protege tu Acceso Clínico.",
        description:
          "Una contraseña robusta garantiza la confidencialidad de los datos de investigación y la seguridad de tus pacientes.",
      }}
      step={{
        currentStep: 1,
        totalSteps: 3,
        stepLabel: "Paso 2 de 3",
        title: "Seguridad",
      }}
    >
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

        {/* Password field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-bold text-on-surface-variant tracking-wide uppercase px-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full bg-surface-container-high border-0 border-b-2 border-primary focus:border-primary/80 focus:ring-0 rounded-t-xl py-4 px-5 pr-12 text-on-surface placeholder:text-outline transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <span className="material-symbols-outlined">{showPw ? "visibility_off" : "visibility"}</span>
            </button>
          </div>

          {/* Validation rules */}
          <div className="pt-3 space-y-2">
            {RULES.map(({ label, check }) => {
              const ok = password !== "" && check(password);
              const fail = password !== "" && !check(password);
              return (
                <div
                  key={label}
                  className={[
                    "flex items-start gap-3 text-sm font-medium px-1 py-2 rounded-xl transition-colors",
                    fail ? "bg-error-container/30 text-error" : "",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "material-symbols-outlined text-lg shrink-0",
                      ok   ? "text-secondary" :
                      fail ? "text-error"     : "text-outline",
                    ].join(" ")}
                    style={{ fontVariationSettings: ok || fail ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {ok ? "check_circle" : fail ? "error" : "radio_button_unchecked"}
                  </span>
                  <span className={ok ? "text-on-surface" : fail ? "" : "text-on-surface-variant"}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirm password */}
        <div className="space-y-2">
          <label htmlFor="confirm-password" className="block text-sm font-bold text-on-surface-variant tracking-wide uppercase px-1">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showCf ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repite tu contraseña"
              className={[
                "w-full bg-surface-container-high border-0 border-b-2 focus:ring-0 rounded-t-xl py-4 px-5 pr-12 text-on-surface placeholder:text-outline transition-all",
                confirm !== "" && !matches ? "border-error focus:border-error" : "border-transparent focus:border-primary",
              ].join(" ")}
            />
            <button
              type="button"
              onClick={() => setShowCf((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label={showCf ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <span className="material-symbols-outlined">{showCf ? "visibility_off" : "visibility"}</span>
            </button>
          </div>
          {confirm !== "" && !matches && (
            <p className="text-xs text-error px-1">Las contraseñas no coinciden.</p>
          )}
          {matches && (
            <p className="text-xs text-secondary px-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Las contraseñas coinciden.
            </p>
          )}
        </div>

        {/* Security tip */}
        <div className="bg-surface-container-low border-l-4 border-secondary-container p-5 rounded-r-xl">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-secondary shrink-0">shield</span>
            <div>
              <h4 className="font-bold text-on-surface text-sm">Consejo de Seguridad</h4>
              <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">
                Evita usar fechas de nacimiento o nombres comunes. Una contraseña robusta protege la
                información confidencial de tus pacientes.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/registro"
            className="flex items-center gap-2 px-4 py-3 font-bold text-on-surface hover:bg-surface-container transition-all rounded-xl active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Atrás
          </Link>
          <Button
            variant="primary"
            size="lg"
            shape="rounded"
            trailingArrow
            disabled={!canSubmit}
            className="shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (!canSubmit) return;
              sessionStorage.setItem("reg_password", password);
              window.location.href = "/registro/confirmacion";
            }}
          >
            Siguiente
          </Button>
        </div>

        <p className="text-center text-sm text-on-surface-variant">
          ¿Necesitas ayuda?{" "}
          <a href="#" className="text-secondary font-bold hover:underline">
            Contactar soporte técnico
          </a>
        </p>
      </form>
    </CenteredFormLayout>
  );
}
