"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Zap, Leaf, Globe, TrendingUp, Users, Shield } from "lucide-react";

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
  { icon: <Zap size={22} />, title: "Technologie Duyunov", desc: "Moteurs électriques brevetés à rendement exceptionnel, applicables dans l'industrie, le transport et l'aéronautique." },
  { icon: <Leaf size={22} />, title: "Impact Écologique", desc: "Réduction significative des émissions industrielles et amélioration de l'efficacité énergétique des équipements." },
  { icon: <Globe size={22} />, title: "Communauté Mondiale", desc: "Une plateforme internationale d'investisseurs, d'ingénieurs et d'entrepreneurs unis autour d'une vision commune." },
  { icon: <TrendingUp size={22} />, title: "Potentiel de Croissance", desc: "Secteur de l'énergie propre en croissance mondiale accélérée — position stratégique pour les investisseurs africains." },
  { icon: <Shield size={22} />, title: "Transparence", desc: "Rapports réguliers, accès à l'avancement des projets et communication ouverte avec la communauté d'investisseurs." },
  { icon: <Users size={22} />, title: "Accessibilité", desc: "Ouvert à tous les profils d'investisseurs — particuliers, entrepreneurs et organisations désireux de participer." },
];

export default function SolargroupPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-white">

      {/* ══ HERO */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-sky-950 via-blue-900 to-sky-800">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950 via-sky-950/80 to-sky-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-400 blur-[100px] pointer-events-none z-[1]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-6 py-24 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Link href="/projets" className="inline-flex items-center gap-2 text-sky-300 hover:text-white transition-colors font-medium text-sm">
              <ArrowLeft size={18} /> Retour aux projets
            </Link>
          </motion.div>
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-sky-400/15 border border-sky-500/30 text-sky-300 text-sm font-semibold backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" /> Énergie / Ingénierie
            </motion.span>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex items-center gap-5 mb-6">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl shadow-xl backdrop-blur-sm shrink-0">
                ⚡
              </motion.div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">SOLARGROUP</h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-xl text-sky-100 leading-relaxed">
              L'énergie de demain, disponible aujourd'hui. Une vision internationale pour l'industrie énergétique et la technologie des moteurs électriques à haut rendement.
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
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Qu'est-ce que SOLARGROUP ?</h2>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  SOLARGROUP est une <strong>communauté internationale d'investissement et d'innovation</strong> qui soutient le développement de projets technologiques dans les domaines de l'énergie, de l'ingénierie et de l'industrie. Le groupe accompagne des solutions basées sur des <strong>moteurs électriques à haut rendement</strong>, développés autour de la technologie Duyunov.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-600 leading-relaxed">
                  L'objectif principal est d'améliorer l'efficacité énergétique des systèmes moteurs industriels et de transport, tout en réduisant les coûts d'exploitation et l'impact environnemental. Ces technologies ouvrent également de nouvelles applications dans l'aéronautique, avec notamment le développement de dirigeables modernes dédiés à la logistique.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
                  <h3 className="text-sky-900 font-bold text-xl mb-3">🎯 La technologie Duyunov</h3>
                  <p className="text-sky-800 leading-relaxed">
                    Le cœur du projet SOLARGROUP repose sur la <strong>technologie brevetée "Slavyanka"</strong> développée par Sergueï Duyunov. Cette technologie de bobinage composite permet d'augmenter significativement le rendement des moteurs électriques — une innovation applicable à une multitude de secteurs industriels et de transport.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h3 className="text-2xl font-extrabold text-gray-900">L'enjeu pour l'Afrique</h3>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Pour l'Afrique, où les enjeux énergétiques, industriels et environnementaux sont majeurs, l'accès aux technologies propres et aux communautés internationales d'innovation représente <strong>une opportunité stratégique pour préparer l'avenir</strong>. SOLARGROUP réunit investisseurs, ingénieurs, entrepreneurs et passionnés de technologie autour d'une vision commune.
                </p>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <FadeUp delay={0.1}>
                <div className="sticky top-28 flex flex-col gap-5">
                  <div className="bg-gradient-to-br from-sky-950 to-blue-900 text-white rounded-2xl p-6 shadow-xl">
                    <h3 className="font-extrabold text-xl mb-1">Rejoindre SOLARGROUP</h3>
                    <p className="text-sky-200 text-sm mb-5">Obtenez votre bonus de bienvenue exclusif dès votre inscription.</p>
                    <div className="bg-sky-400/20 border border-sky-400/30 rounded-xl p-4 mb-5">
                      <p className="text-sky-200 text-xs font-bold uppercase tracking-wider mb-1">🎁 Bonus exclusif</p>
                      <p className="text-white font-bold text-lg">50$ offerts dès l'inscription</p>
                      <p className="text-sky-300 text-xs mt-1">Après validation KYC obligatoire</p>
                    </div>
                    <a href="https://reg.solargroup.pro/fr/user/ref/plan/my-status?ref_code=djh678" target="_blank" rel="noopener noreferrer"
                      className="group w-full bg-sky-400 hover:bg-sky-300 text-sky-950 font-extrabold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-sky-400/30 hover:scale-[1.02]">
                      S'inscrire et obtenir mon bonus
                      <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <p className="text-sky-400 text-xs text-center mt-3">L'investissement comporte des risques.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3">Secteur</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Énergie propre", "Ingénierie", "Moteurs électriques", "Innovation industrielle", "Aéronautique"].map(t => (
                        <span key={t} className="text-xs bg-sky-100 text-sky-700 font-semibold px-3 py-1 rounded-full">{t}</span>
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
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Les 6 raisons pour lesquelles SOLARGROUP se distingue comme une opportunité technologique majeure.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFacts.map((fact, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    {fact.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-sky-700 transition-colors">{fact.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{fact.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL */}
      <section className="py-24 bg-gradient-to-br from-sky-950 via-blue-900 to-sky-800 text-white relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-sky-400/10" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-3xl mx-auto">Prêt à rejoindre la révolution énergétique ?</h2>
            <p className="text-sky-200 text-xl mb-10 max-w-xl mx-auto">Obtenez votre bonus de 50$ dès aujourd'hui et participez au développement de l'énergie de demain.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://reg.solargroup.pro/fr/user/ref/plan/my-status?ref_code=djh678" target="_blank" rel="noopener noreferrer"
                className="group bg-sky-400 hover:bg-sky-300 text-sky-950 font-extrabold px-10 py-5 rounded-xl transition-all shadow-xl text-lg inline-flex items-center gap-2 hover:scale-105">
                S'inscrire sur SOLARGROUP <ExternalLink size={20} />
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
