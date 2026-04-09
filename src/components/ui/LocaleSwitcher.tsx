"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleChange(newLocale: Locale) {
    // Reemplazar el locale en la URL
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  }

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={[
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            locale === loc
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
          ].join(" ")}
          aria-label={`Switch to ${localeLabels[loc]}`}
          aria-current={locale === loc ? "true" : undefined}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
