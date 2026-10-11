"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Factory, Settings, Cpu, TrendingUp, Award, Users } from "lucide-react";

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
  { icon: <Settings size={22} />, title: "Technologie Transcore™", desc: "Procédé breveté de synthèse contrôlée permettant la production de matériaux métalliques stratégiques avec une précision industrielle inédite." },
  { icon: <Factory size={22} />, title: "Infrastructure Évolutive", desc: "Des installations conçues pour croître progressivement, intégrant recherche, contrôle qualité et production à grande échelle." },
  { icon: <Cpu size={22} />, title: "Innovation Industrielle", desc: "Une approche qui repense fondamentalement la transformation des ressources, en s'appuyant sur des procédés scientifiques de pointe." },
  { icon: <TrendingUp size={22} />, title: "178 Milliards USD", desc: "Dividendes estimés à distribuer entre les détenteurs de parts à partir de 2029, selon les projections du groupe." },
  { icon: <Award size={22} />, title: "Matériaux Stratégiques", desc: "Production de métaux essentiels à l'économie mondiale et aux nouvelles industries technologiques (énergie, électronique, défense)." },
  { icon: <Users size={22} />, title: "Opportunité Africaine", desc: "La transformation locale des ressources et le développement des compétences scientifiques comme leviers de compétitivité économique pour le continent." },
];

export default function ReactorPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-white">

      {/* ══ HERO */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-orange-950 via-amber-900 to-orange-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950 via-orange-950/80 to-orange-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-950 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-400 blur-[100px] pointer-events-none z-[1]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-6 py-24 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Link href="/projets" className="inline-flex items-center gap-2 text-orange-300 hover:text-white transition-colors font-medium text-sm">
              <ArrowLeft size={18} /> Retour aux projets
            </Link>
          </motion.div>
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-orange-400/15 border border-orange-500/30 text-orange-300 text-sm font-semibold backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" /> Industrie / Technologie de synthèse
            </motion.span>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex items-center gap-5 mb-6">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl shadow-xl backdrop-blur-sm shrink-0">
                🚀
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">REACTOR /<br />GOLDEN AFRICA</h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-xl text-orange-100 leading-relaxed">
              Vers une nouvelle génération d'innovation industrielle. La technologie Transcore™ pour repenser la production des métaux essentiels à l'économie mondiale.
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
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Qu'est-ce que REACTOR / GOLDEN AFRICA ?</h2>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  REACTOR (aussi présenté sous le nom SINTEZMET) est un projet technologique ambitieux centré sur une <strong>nouvelle approche de la transformation des ressources</strong>. L'objectif est de développer des procédés industriels avancés visant à produire des matériaux stratégiques grâce à des <strong>technologies de synthèse contrôlée</strong>.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-600 leading-relaxed">
                  À travers l'approche exclusive <strong>Transcore™</strong>, le projet met en avant une vision où la science, l'ingénierie et la maîtrise des procédés industriels peuvent contribuer à repenser la manière dont les métaux essentiels sont produits et valorisés. Le groupe construit une infrastructure évolutive intégrant recherche, contrôle qualité et développement industriel.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                  <h3 className="text-orange-900 font-bold text-xl mb-3">🚀 La technologie Transcore™</h3>
                  <p className="text-orange-800 leading-relaxed">
                    Transcore™ est le nom du procédé industriel breveté développé par le groupe REACTOR. Cette technologie de <strong>synthèse des matériaux</strong> vise à produire des métaux stratégiques de haute qualité, essentiels pour les industries technologiques, énergétiques et de défense — avec une approche plus précise, plus propre et plus rentable que les méthodes traditionnelles.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h3 className="text-2xl font-extrabold text-gray-900">L'enjeu pour l'Afrique</h3>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Pour l'Afrique, ces évolutions technologiques représentent un enjeu majeur. La transformation locale des ressources, le développement des compétences scientifiques et l'innovation industrielle peuvent devenir des <strong>leviers importants pour renforcer la compétitivité économique du continent</strong>. Suivre les avancées dans les technologies industrielles émergentes permet aux entrepreneurs et investisseurs africains de mieux comprendre les secteurs qui façonneront l'économie mondiale de demain.
                </p>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <FadeUp delay={0.1}>
                <div className="sticky top-28 flex flex-col gap-5">
                  <div className="bg-gradient-to-br from-orange-950 to-amber-900 text-white rounded-2xl p-6 shadow-xl">
                    <h3 className="font-extrabold text-xl mb-1">Accéder à l'opportunité</h3>
                    <p className="text-orange-200 text-sm mb-5">Acquérez des parts et participez au partage des dividendes projetés.</p>
                    <div className="bg-orange-400/20 border border-orange-400/30 rounded-xl p-4 mb-5">
                      <p className="text-orange-200 text-xs font-bold uppercase tracking-wider mb-1">🎁 Potentiel estimé</p>
                      <p className="text-white font-bold text-lg">178 Milliards USD</p>
                      <p className="text-orange-300 text-xs mt-1">Dividendes projetés à distribuer dès 2029</p>
                    </div>
                    <a href="https://goldenafrica-invest.com/sign-up?ref=G4A4222Y" target="_blank" rel="noopener noreferrer"
                      className="group w-full bg-orange-400 hover:bg-orange-300 text-orange-950 font-extrabold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02]">
                      Accéder à l'opportunité
                      <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <p className="text-orange-400 text-xs text-center mt-3">L'investissement comporte des risques. KYC requis.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3">Secteur</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Industrie", "Synthèse matériaux", "Métaux stratégiques", "Innovation", "Technologie Transcore™"].map(t => (
                        <span key={t} className="text-xs bg-orange-100 text-orange-700 font-semibold px-3 py-1 rounded-full">{t}</span>
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
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Les 6 raisons pour lesquelles REACTOR / GOLDEN AFRICA se positionne comme une opportunité industrielle d'exception.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFacts.map((fact, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {fact.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-orange-700 transition-colors">{fact.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{fact.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL */}
      <section className="py-24 bg-gradient-to-br from-orange-950 via-amber-900 to-orange-800 text-white relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-orange-400/10" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-3xl mx-auto">Prêt à participer à la révolution industrielle ?</h2>
            <p className="text-orange-200 text-xl mb-10 max-w-xl mx-auto">Acquérez des parts et participez aux dividendes projetés de 178 milliards USD à partir de 2029.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://goldenafrica-invest.com/sign-up?ref=G4A4222Y" target="_blank" rel="noopener noreferrer"
                className="group bg-orange-400 hover:bg-orange-300 text-orange-950 font-extrabold px-10 py-5 rounded-xl transition-all shadow-xl text-lg inline-flex items-center gap-2 hover:scale-105">
                S'inscrire sur REACTOR <ExternalLink size={20} />
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
