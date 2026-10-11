"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        scrolled ? "glass-effect shadow-md py-2.5 sm:py-3" : "bg-white/95 backdrop-blur-sm py-3.5 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo & Nom de l'entreprise (visible sur Mobile et Desktop) */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/images/logo.webp"
              alt="Logo BAOBAB MIND & CAPITAL"
              width={140}
              height={42}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
            <div className="flex flex-col">
              <span className="text-primary-dark font-black text-xs sm:text-base md:text-lg uppercase tracking-tight leading-none">
                BAOBAB
              </span>
              <span className="text-primary font-bold text-[9px] sm:text-xs md:text-sm tracking-wider uppercase leading-none mt-0.5">
                MIND & CAPITAL
              </span>
            </div>
          </div>
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
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            Découvrir
            <ArrowRight size={16} />
          </Link>
        </nav>

        {/* Mobile Menu Button avec transition fluide */}
        <button
          className="md:hidden text-foreground p-2 rounded-xl focus:outline-none hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation Déroulante ultra-fluide */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-white/98 backdrop-blur-md shadow-2xl border-t border-gray-100"
          >
            <div className="py-4 px-5 flex flex-col gap-2">
              <ul className="flex flex-col gap-1.5">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-base font-semibold py-2.5 px-3.5 rounded-xl transition-all ${
                        pathname === link.href
                          ? "text-primary bg-primary/10 font-bold"
                          : "text-gray-800 hover:text-primary hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/projets"
                onClick={() => setIsOpen(false)}
                className="bg-primary hover:bg-primary-dark text-white text-center py-3.5 px-4 rounded-xl text-sm font-bold flex justify-center items-center gap-2 mt-2 shadow-md transition-colors"
              >
                Découvrir nos projets
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
