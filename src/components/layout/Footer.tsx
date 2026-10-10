"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = "2026";
  const pathname = usePathname();

  // Isoler l'espace admin
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3"><Image src="/images/logo.webp" alt="Logo" width={160} height={48} className="h-10 md:h-12 w-auto object-contain brightness-0 invert" /><span className="text-lg md:text-xl font-black tracking-wider text-white uppercase leading-none">BAOBAB <br/><span className="text-accent text-sm md:text-base">MIND & CAPITAL</span></span></div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nous accompagnons les entrepreneurs et investisseurs africains à travers des projets innovants dans l'énergie, l'industrie, la santé et le numérique.
            </p>
            <p className="text-sm font-semibold italic text-accent mt-2">
              Innovation • Technologie • Vision
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liens Rapides</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Notre Vision (Vision ZONGO 2030)
                </Link>
              </li>
              <li>
                <Link href="/projets" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Nos Projets Technologiques
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Actualités & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Nous Contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Nos Projets</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/projets/solargroup" className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-2">
                  <span className="text-accent">⚡</span> SOLARGROUP
                </Link>
              </li>
              <li>
                <Link href="/projets/reactor" className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-2">
                  <span className="text-accent">🚀</span> REACTOR / GOLDEN AFRICA
                </Link>
              </li>
              <li>
                <Link href="/projets/aureus" className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-2">
                  <span className="text-accent">🌍</span> AUREUS ALLIANCE
                </Link>
              </li>
              <li>
                <Link href="/projets/mlc" className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-2">
                  <span className="text-accent">❤️</span> MY LIFE CONTROL
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-0.5" size={20} />
                <span className="text-gray-300 text-sm">
                  Zone d’Activités Diverses (ZAD)<br />
                  Ouagadougou, Burkina Faso
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={20} />
                <a href="tel:+22664240227" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  +226 64 24 02 27
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={20} />
                <a href="mailto:zousmane86@gmail.com" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  zousmane86@gmail.com
                </a>
              </li>
            </ul>
            
            
          </div>
          
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {currentYear} Baobab Mind & Capital. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
          </div>
        </div>

        {/* Developer Credit - BAROUBA GROUP */}
        <div className="mt-8 flex justify-center pb-2">
          <a
            href="mailto:baroubagroup@gmail.com"
            className="group inline-flex items-center gap-2 px-4 py-1.5 bg-black/30 hover:bg-black/60 border border-white/5 hover:border-[#D4A843]/30 rounded-full text-[11px] text-gray-400 hover:text-gray-200 transition-all shadow-sm"
          >
            <span className="text-red-500/70 group-hover:text-red-500 transition-colors text-[10px]">❤️</span>
            <span>Développé avec passion par</span>
            <span className="font-bold tracking-wider" style={{ color: "#D4A843" }}>BAROUBA GROUP</span>
            <span className="text-red-500/70 group-hover:text-red-500 transition-colors text-[10px]">❤️</span>
          </a>
        </div>
      </div>
    </footer>
  );
}





