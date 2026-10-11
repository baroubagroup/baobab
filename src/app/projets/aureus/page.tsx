"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Gem, Scale, Network, Leaf, Globe, TrendingUp } from "lucide-react";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 35 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

const keyFacts = [
  { icon: <Gem size={22} />, title: "Production Réelle d'Or", desc: "Contrairement à de nombreux projets spéculatifs, AUREUS repose sur une production réelle d'or — un actif tangible, solide et éprouvé." },
  { icon: <Scale size={22} />, title: "Gouvernance Transparente", desc: "Un modèle de gouvernance international rigoureux, avec des rapports réguliers et une communication ouverte avec les investisseurs." },
  { icon: <Leaf size={22} />, title: "Exploitation Durable", desc: "Utilisation d'énergies renouvelables et de procédés plus respectueux de l'environnement pour une industrie minière responsable." },
  { icon: <Network size={22} />, title: "Développement Communautaire", desc: "Création d'emplois locaux, transfert de compétences et soutien aux communautés dans les zones d'exploitation." },
  { icon: <Globe size={22} />, title: "Vision Panafricaine", desc: "Un projet ancré dans les réalités africaines, conçu pour valoriser les ressources du continent au bénéfice des investisseurs africains." },
  { icon: <TrendingUp size={22} />, title: "1 000$ de Titres Offerts", desc: "Dès votre inscription validée (KYC), obtenez des titres financiers d'une valeur de 1 000$ — un avantage exclusif pour les premiers inscrits." },
];

export default function AureusPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-white">

      {/* ══ HERO */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-yellow-950 via-yellow-900 to-amber-800">
        <div className="absolute inset-0 z-0">
          <Image src="/images/pdg.webp" alt="BAOBAB Mind & Capital" fill priority className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-950 via-yellow-950/85 to-yellow-950/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-950 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-yellow-400 blur-[100px] pointer-events-none z-[1]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-6 py-24 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Link href="/projets" className="inline-flex items-center gap-2 text-yellow-300 hover:text-white transition-colors font-medium text-sm">
              <ArrowLeft size={18} /> Retour aux projets
            </Link>
          </motion.div>
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-yellow-400/15 border border-yellow-500/30 text-yellow-300 text-sm font-semibold backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" /> Investissement Aurifère
            </motion.span>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex items-center gap-5 mb-6">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl shadow-xl backdrop-blur-sm shrink-0">
                🌍
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">AUREUS<br />ALLIANCE<br />HOLDINGS</h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-xl text-yellow-100 leading-relaxed">
              L'investissement aurifère africain réinventé — durable, transparent, à fort impact économique et communautaire.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ══ PRÉSENTATION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 flex flex-col gap-8">
              <FadeUp>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Qu'est-ce qu'AUREUS ALLIANCE ?</h2>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  AUREUS ALLIANCE HOLDINGS développe une <strong>approche moderne de l'industrie aurifère</strong>, basée sur des projets miniers responsables, une production réelle d'or et une gouvernance transparente. Sa vision est de créer des écosystèmes intégrant exploitation minière durable, innovation technologique et développement communautaire en Afrique.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-600 leading-relaxed">
                  À travers des solutions adaptées — notamment l'utilisation d'<strong>énergies renouvelables</strong> et de procédés plus respectueux de l'environnement — le groupe ambitionne de contribuer à une industrie aurifère plus responsable, plus inclusive et plus rentable pour tous les acteurs, des investisseurs aux communautés locales.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6">
                  <h3 className="text-yellow-900 font-bold text-xl mb-3">🌍 Une vision africaine de l'or</h3>
                  <p className="text-yellow-800 leading-relaxed">
                    L'Afrique possède les plus grandes réserves aurifères du monde, mais la valeur ajoutée est souvent captée par des acteurs extérieurs. AUREUS ALLIANCE entend changer ce paradigme en permettant aux <strong>investisseurs africains de détenir des parts directes</strong> dans des projets miniers sérieux, avec des rendements réels et une gouvernance internationale.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h3 className="text-2xl font-extrabold text-gray-900">Diversification et stratégie</h3>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Pour les professionnels et entrepreneurs africains, la diversification vers des actifs tangibles et des projets internationaux représente une opportunité d'élargir leurs perspectives économiques et stratégiques. AUREUS ALLIANCE HOLDINGS s'inscrit dans une <strong>dynamique de création de valeur durable</strong>, en connectant ressources africaines, expertise internationale et impact positif mesurable.
                </p>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <FadeUp delay={0.1}>
                <div className="sticky top-28 flex flex-col gap-5">
                  <div className="bg-gradient-to-br from-yellow-950 to-amber-900 text-white rounded-2xl p-6 shadow-xl">
                    <h3 className="font-extrabold text-xl mb-1">Rejoindre AUREUS ALLIANCE</h3>
                    <p className="text-yellow-200 text-sm mb-5">Détenez dès maintenant des titres financiers dans un projet aurifère sérieux.</p>
                    <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-4 mb-5">
                      <p className="text-yellow-200 text-xs font-bold uppercase tracking-wider mb-1">🎁 Bonus d'inscription</p>
                      <p className="text-white font-bold text-lg">1 000$ de titres offerts</p>
                      <p className="text-yellow-300 text-xs mt-1">Après validation KYC obligatoire</p>
                    </div>
                    <a href="https://www.aureus.africa/zousmane" target="_blank" rel="noopener noreferrer"
                      className="group w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-extrabold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02]">
                      Créer mon compte AUREUS
                      <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <p className="text-yellow-400 text-xs text-center mt-3">L'investissement comporte des risques. KYC requis.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3">Secteur</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Or", "Investissement", "Mines durables", "Afrique", "Actifs tangibles"].map(t => (
                        <span key={t} className="text-xs bg-yellow-100 text-yellow-800 font-semibold px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══ POINTS CLÉS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Pourquoi ce projet ?</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Les 6 raisons pour lesquelles AUREUS ALLIANCE se distingue comme un investissement aurifère africain de nouvelle génération.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFacts.map((fact, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                    {fact.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-yellow-700 transition-colors">{fact.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{fact.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL */}
      <section className="py-24 bg-gradient-to-br from-yellow-950 via-yellow-900 to-amber-800 text-white relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-yellow-400/10" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-3xl mx-auto">Rejoignez la nouvelle vision de l'or africain.</h2>
            <p className="text-yellow-200 text-xl mb-10 max-w-xl mx-auto">Créez votre compte et obtenez 1 000$ de titres financiers offerts pour commencer l'aventure.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.aureus.africa/zousmane" target="_blank" rel="noopener noreferrer"
                className="group bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-extrabold px-10 py-5 rounded-xl transition-all shadow-xl text-lg inline-flex items-center gap-2 hover:scale-105">
                Créer mon compte AUREUS <ExternalLink size={20} />
              </a>
              <Link href="/projets" className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-10 py-5 rounded-xl transition-all text-lg backdrop-blur-sm">
                ← Tous les projets
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
