"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavTab = {
  label: string;
  href: string;
  icon: string;
  activeIcon?: string;
};

type BottomNavBarProps = {
  tabs?: NavTab[];
};

const DEFAULT_TABS: NavTab[] = [
  { label: "Explorar", href: "/",          icon: "explore" },
  { label: "Guardados", href: "/guardados", icon: "bookmark" },
  { label: "Perfil",    href: "/perfil",    icon: "person" },
];

export default function BottomNavBar({ tabs = DEFAULT_TABS }: BottomNavBarProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-6 bg-white/90 glass-nav border-t border-gray-100 rounded-t-3xl md:hidden">
      {tabs.map(({ label, href, icon, activeIcon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={[
              "flex flex-col items-center justify-center gap-0.5 transition-all",
              isActive
                ? "text-primary bg-primary/5 rounded-xl px-5 py-1"
                : "text-gray-400 hover:text-primary px-5 py-1",
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
