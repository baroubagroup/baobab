"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Layers, BookOpen, Phone } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Masquer sur la zone d'administration
  if (pathname?.startsWith("/admin")) return null;

  const navItems = [
    { label: "Accueil", href: "/", icon: Home, matchPrefix: false },
    { label: "Notre Vision", href: "/a-propos", icon: Compass, matchPrefix: false },
    { label: "Nos Projets", href: "/projets", icon: Layers, matchPrefix: true },
    { label: "Blog", href: "/blog", icon: BookOpen, matchPrefix: true },
    { label: "Contact", href: "/contact", icon: Phone, matchPrefix: false },
  ];

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1 px-1.5 transition-all"
    >
      <div className="grid grid-cols-5 items-center justify-items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.matchPrefix
            ? pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
            : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex flex-col items-center justify-center w-full py-1 px-0.5 rounded-xl transition-all duration-150 active:scale-95 ${
                isActive ? "text-primary font-bold" : "text-gray-500 hover:text-primary font-medium"
              }`}
            >
              <div
                className={`relative flex items-center justify-center w-10 h-7 rounded-full transition-all duration-150 ${
                  isActive ? "bg-primary/10 text-primary" : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                {isActive && (
                  <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-accent" />
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 leading-none transition-colors ${
                  isActive ? "text-primary font-extrabold" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
