"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Notre Vision", href: "/a-propos" },
    { name: "Nos Projets", href: "/projets" },
    { name: "Blog", href: "/blog" },
    { name: "Contacts", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-md py-2.5 sm:py-3" : "bg-white/95 backdrop-blur-sm py-3 sm:py-4 md:py-5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-6 flex justify-between items-center gap-2">
        {/* Logo & Nom de l'entreprise sur une SEULE ligne, grand et bien visible */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <Image
            src="/images/logo.webp"
            alt="Logo BAOBAB MIND & CAPITAL"
            width={140}
            height={42}
            className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-primary-dark font-black text-xs sm:text-base md:text-xl uppercase tracking-tight whitespace-nowrap">
            BAOBAB <span className="text-primary font-black">MIND & CAPITAL</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary font-bold" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bouton d'action "Découvrir nos projets" aux couleurs de l'entreprise (Vert) */}
        <div className="flex items-center shrink-0">
          <Link
            href="/projets"
            className="bg-primary hover:bg-primary-dark text-white px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            <span>Découvrir nos projets</span>
            <ArrowRight size={14} className="shrink-0" />
          </Link>
        </div>
      </div>
    </header>
  );
}
