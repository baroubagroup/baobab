"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
        scrolled ? "glass-effect shadow-md py-3" : "bg-white/80 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3"><Image src="/images/logo.webp" alt="Logo" width={160} height={48} className="h-10 md:h-12 w-auto object-contain" priority /><span className="text-primary-dark font-black text-lg md:text-xl uppercase tracking-wider hidden sm:block">BAOBAB <span className="text-primary">MIND & CAPITAL</span></span></div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/projets"
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            Découvrir
            <ArrowRight size={16} />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block text-base font-medium p-2 rounded-md transition-colors ${
                    pathname === link.href
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-foreground hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/projets"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-white text-center px-4 py-3 rounded-md text-sm font-medium flex justify-center items-center gap-2 mt-2"
          >
            Découvrir nos projets
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}





