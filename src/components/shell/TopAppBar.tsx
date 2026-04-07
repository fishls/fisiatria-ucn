"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Explorar", href: "/" },
  { label: "Guardados", href: "/guardados" },
  { label: "Perfil", href: "/perfil" },
];

export default function TopAppBar(props: TopAppBarProps) {
  const pathname = usePathname();

  if (props.variant === "back") {
    return (
      <header className="fixed top-0 w-full z-50 bg-white/80 glass-nav shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <Link
            href={props.backHref ?? "/"}
            className="text-primary active:scale-95 transition-transform duration-200"
            aria-label="Volver"
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
              aria-label="Acción"
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
    const { showNotifications = true, avatarSrc, avatarAlt = "Avatar" } = props;
    return (
      <header className="fixed top-0 w-full z-50 bg-white/80 glass-nav shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">school</span>
            <span className="font-headline font-extrabold tracking-tighter text-primary text-2xl">
              Fisiatría UCN
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {showNotifications && (
              <button
                className="p-2 rounded-full hover:bg-surface-container transition-colors"
                aria-label="Notificaciones"
              >
                <span className="material-symbols-outlined text-on-surface-variant">
                  notifications
                </span>
              </button>
            )}
            {avatarSrc ? (
              <Link href="/perfil" aria-label="Mi perfil">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20">
                  <img
                    src={avatarSrc}
                    alt={avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <Link
                href="/perfil"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                aria-label="Mi perfil"
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
  const navLinks = (props as { navLinks?: NavLink[] }).navLinks ?? DEFAULT_NAV_LINKS;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">school</span>
          <span className="font-headline font-extrabold tracking-tighter text-primary text-2xl">
            Fisiatría UCN
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
                    : "text-gray-600 hover:text-primary px-3",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Search icon */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Buscar"
        >
          <span className="material-symbols-outlined text-gray-600">search</span>
        </button>
      </div>
    </nav>
  );
}
