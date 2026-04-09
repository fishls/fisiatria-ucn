"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

type NavTab = {
  label: string;
  href: string;
  icon: string;
  activeIcon?: string;
};

type BottomNavBarProps = {
  tabs?: NavTab[];
};

export default function BottomNavBar({ tabs }: BottomNavBarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const defaultTabs: NavTab[] = [
    { label: t("explore"), href: "/",          icon: "explore" },
    { label: t("saved"), href: "/guardados", icon: "bookmark" },
    { label: t("profile"),    href: "/perfil",    icon: "person" },
  ];

  const navTabs = tabs ?? defaultTabs;

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-6 bg-surface-container-lowest/90 glass-nav border-t border-outline-variant/20 rounded-t-3xl md:hidden">
      {navTabs.map(({ label, href, icon, activeIcon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={[
              "flex flex-col items-center justify-center gap-0.5 transition-all",
              isActive
                ? "text-primary bg-primary/5 rounded-xl px-5 py-1"
                : "text-outline hover:text-primary px-5 py-1",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isActive && activeIcon ? activeIcon : icon}
            </span>
            <span className="font-label text-[11px] font-bold uppercase tracking-wider">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
