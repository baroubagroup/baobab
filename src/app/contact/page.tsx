"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Clock, Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

// ─── Composants d'animation ──────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Données de contact ──────────────────────────────────────────────────────

const contactMethods = [
  {
    icon: <MapPin size={28} />,
    title: "Notre Bureau",
    details: ["Zone d'Activités Diverses (ZAD)", "Ouagadougou, Burkina Faso"],
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-500/30",
  },
  {
    icon: <Clock size={28} />,
    title: "Disponibilité",
    details: ["Ouvert actuellement", "Service accessible 7j/7"],
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-600",
    hoverBorder: "hover:border-amber-500/30",
  },
  {
    icon: <Phone size={28} />,
    title: "Téléphone direct",
    details: ["+226 64 24 02 27", "Appels et WhatsApp"],
    color: "from-green-500/20 to-green-500/5",
    iconColor: "text-green-600",
    hoverBorder: "hover:border-green-500/30",
    link: "tel:+22664240227",
  },
  {
    icon: <Mail size={28} />,
    title: "Email",
    details: ["zousmane86@gmail.com", "Réponse sous 24h"],
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-600",
    hoverBorder: "hover:border-purple-500/30",
    link: "mailto:zousmane86@gmail.com",
  },
];

export default function ContactPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-white min-h-screen">

      {/* ══════════════════════════════════════════════════ HERO */}
      <section ref={heroRef} className="relative bg-primary-dark text-white min-h-[50vh] flex items-center overflow-hidden">
        {/* Background avec photo du PDG en filigrane */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/pdg.webp" alt="BAOBAB Mind & Capital" fill priority className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-primary-dark/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        {/* Blobs animés */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-accent blur-[120px] pointer-events-none z-[1]" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.08, 0.03] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-white blur-[100px] pointer-events-none z-[1]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-6 pt-32 pb-20 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/15 text-accent text-sm font-semibold backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              Disponibles pour échanger
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Contactez <span className="text-accent">BAOBAB MIND & CAPITAL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Que vous souhaitiez développer vos compétences, bénéficier d'un accompagnement stratégique, ou explorer des opportunités d'investissement.
          </motion.p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════ MAIN CONTENT */}
      <section className="py-24 relative z-20 -mt-10">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Colonne de gauche: Cartes de contact */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
              {contactMethods.map((method, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/40 border border-gray-100 ${method.hoverBorder} transition-colors h-full flex flex-col group relative overflow-hidden`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${method.color} rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500`} />
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 bg-gray-50 border border-gray-100 group-hover:bg-white transition-colors ${method.iconColor}`}>
                      {method.icon}
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-gray-900 mb-4 relative z-10">{method.title}</h3>
                    
                    <div className="flex flex-col gap-1 relative z-10">
                      {method.link ? (
                        <a href={method.link} className={`font-medium ${method.iconColor} hover:underline`}>
                          {method.details[0]}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-800">{method.details[0]}</p>
                      )}
                      <p className="text-gray-500 text-sm">{method.details[1]}</p>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>

            {/* Colonne de droite: Call to Action WhatsApp géant */}
            <div className="lg:col-span-2">
              <FadeUp delay={0.3} className="h-full">
                <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white rounded-3xl p-10 h-full flex flex-col justify-between relative overflow-hidden shadow-2xl">
                  {/* Cercles décoratifs */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-8">
                      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40 text-white">
                        <MessageCircle size={32} fill="currentColor" />
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-extrabold mb-4 leading-tight">
                      Discutons de vos projets en <span className="text-accent">direct</span>
                    </h2>
                    
                    <p className="text-primary-100 text-lg mb-10 leading-relaxed opacity-90">
                      Notre équipe est particulièrement réactive sur WhatsApp. C'est le moyen le plus rapide pour obtenir des réponses à vos questions ou planifier un rendez-vous avec Ousmane Zongo.
                    </p>
                  </div>

                  <a 
                    href="https://wa.me/22664240227?text=Bonjour,%20je%20vous%20contacte%20depuis%20votre%20site%20web."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 group bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-8 py-5 rounded-2xl transition-all shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-[1.02] flex items-center justify-between overflow-hidden w-full"
                  >
                    <span className="relative z-10 text-lg">Démarrer la discussion</span>
                    <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Effet de brillance au survol */}
                    <div className="absolute inset-0 h-full w-0 bg-white/20 group-hover:w-full transition-all duration-300 ease-out z-0" />
                  </a>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ BOTTOM MESSAGE */}
      <section className="py-12 bg-light-gray text-center border-t border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-gray-500 font-medium">
            BAOBAB Mind & Capital — L'excellence au service de l'innovation africaine.
          </p>
        </div>
      </section>

    </div>
  );
}
