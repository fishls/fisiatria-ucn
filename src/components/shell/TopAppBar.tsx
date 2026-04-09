"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

type NavLink = {
  label: string;
  href: string;
};

type TopAppBarProps =
  | {
      variant?: "default";
      navLinks?: NavLink[];
    }
  | {
      variant: "contextual";
      showNotifications?: boolean;
      avatarSrc?: string;
      avatarAlt?: string;
    }
  | {
      variant: "back";
      title: string;
      backHref?: string;
      actionIcon?: string;
      onAction?: () => void;
    };

export default function TopAppBar(props: TopAppBarProps) {
  const t = useTranslations();
  const pathname = usePathname();

  if (props.variant === "back") {
    return (
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 glass-nav shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <Link
            href={props.backHref ?? "/"}
            className="text-primary active:scale-95 transition-transform duration-200"
            aria-label={t("nav.back")}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline font-bold tracking-tight text-xl">
            {props.title}
          </h1>
          {props.actionIcon ? (
            <button
              onClick={props.onAction}
              className="text-primary active:scale-95 transition-transform duration-200"
              aria-label={t("nav.close")}
            >
              <span className="material-symbols-outlined">{props.actionIcon}</span>
            </button>
          ) : (
            <div className="w-6" aria-hidden />
          )}
        </div>
      </header>
    );
  }

  if (props.variant === "contextual") {
    const { showNotifications = true, avatarSrc, avatarAlt } = props;
    return (
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 glass-nav shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">school</span>
            <span className="font-headline font-extrabold tracking-tighter text-primary text-2xl">
              {t("app.name")}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {showNotifications && (
              <button
                className="p-2 rounded-full hover:bg-surface-container transition-colors"
                aria-label={t("notifications")}
              >
                <span className="material-symbols-outlined text-on-surface-variant">
                  notifications
                </span>
              </button>
            )}
            {avatarSrc ? (
              <Link href="/perfil" aria-label={t("nav.profile")}>
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 relative">
                  <Image
                    src={avatarSrc}
                    alt={avatarAlt ?? t("nav.profile")}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              </Link>
            ) : (
              <Link
                href="/perfil"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                aria-label={t("nav.profile")}
              >
                <span className="material-symbols-outlined text-primary text-xl">person</span>
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }

  // variant === "default" (or undefined)
  const defaultNavLinks: NavLink[] = [
    { label: t("nav.explore"), href: "/" },
    { label: t("nav.saved"), href: "/guardados" },
    { label: t("nav.profile"), href: "/perfil" },
  ];
  const navLinks = (props as { navLinks?: NavLink[] }).navLinks ?? defaultNavLinks;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant/20 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">school</span>
          <span className="font-headline font-extrabold tracking-tighter text-primary text-2xl">
            {t("app.name")}
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "font-label text-sm py-1 transition-colors",
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-primary px-3",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Locale switcher and Search */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
        <button
          className="p-2 rounded-full hover:bg-surface-container transition-colors"
          aria-label={t("nav.search")}
        >
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
        </button>
        </div>
      </div>
    </nav>
  );
}
