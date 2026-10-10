"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, HeartPulse, Activity, Smartphone, Shield, Globe, TrendingUp } from "lucide-react";

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
  { icon: <Activity size={22} />, title: "Surveillance Continue (CGM)", desc: "Technologies de surveillance continue de la glycémie et d'autres paramètres vitaux — 24h/24, en temps réel, directement sur votre smartphone." },
  { icon: <HeartPulse size={22} />, title: "Approche Préventive", desc: "Passer d'une médecine réactive à une santé proactive : anticiper les déséquilibres avant qu'ils ne deviennent des problèmes graves." },
  { icon: <Smartphone size={22} />, title: "Application Numérique", desc: "Une interface intuitive et moderne pour visualiser, analyser et partager ses données de santé avec ses professionnels de santé." },
  { icon: <Shield size={22} />, title: "Données Sécurisées", desc: "Protection rigoureuse des données personnelles de santé, conformément aux standards médicaux et de confidentialité internationaux." },
  { icon: <Globe size={22} />, title: "Accessible à l'Afrique", desc: "Une solution conçue pour s'adapter aux réalités du continent africain — accessibilité, connectivité et utilisabilité au cœur du projet." },
  { icon: <TrendingUp size={22} />, title: "200 Parts Offertes", desc: "Dès votre inscription validée (KYC), obtenez gratuitement 200 parts du projet MLC — une entrée dans la révolution MedTech sans frais initiaux." },
];

export default function MlcPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-white">

      {/* ══ HERO */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-rose-950 via-red-900 to-rose-800">
        <div className="absolute inset-0 z-0">
          {/* ⬇ Remplacez : public/images/image_projet_mlc.png */}
          <img src="/images/image_bg_projets.svg" alt="MLC" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-950 via-rose-950/80 to-rose-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-rose-400 blur-[100px] pointer-events-none z-[1]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-6 py-24 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Link href="/projets" className="inline-flex items-center gap-2 text-rose-300 hover:text-white transition-colors font-medium text-sm">
              <ArrowLeft size={18} /> Retour aux projets
            </Link>
          </motion.div>
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-rose-400/15 border border-rose-500/30 text-rose-300 text-sm font-semibold backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" /> MedTech / Santé connectée
            </motion.span>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex items-center gap-5 mb-6">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-5xl shadow-xl backdrop-blur-sm shrink-0">
                ❤️
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">MY LIFE<br />CONTROL (MLC)</h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-xl text-rose-100 leading-relaxed">
              La technologie au service d'une meilleure santé. Solutions numériques innovantes pour la surveillance continue, la prévention et une santé personnalisée.
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
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Qu'est-ce que MY LIFE CONTROL ?</h2>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  MY LIFE CONTROL (MLC) est un projet international de <strong>MedTech</strong> qui développe des solutions numériques innovantes pour accompagner une nouvelle génération de soins de santé personnalisés. MLC s'intéresse notamment aux <strong>technologies de surveillance continue de la glycémie (CGM)</strong>, permettant un meilleur suivi des données de santé et une approche plus proactive de la prévention et du bien-être.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-gray-600 leading-relaxed">
                  Grâce à la combinaison de <strong>dispositifs médicaux intelligents</strong>, d'applications numériques et d'une vision internationale de la santé, MLC participe à la transformation digitale du secteur médical. L'objectif est d'offrir à chaque individu les outils pour comprendre et prendre le contrôle de sa propre santé — de manière simple, accessible et continue.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
                  <h3 className="text-rose-900 font-bold text-xl mb-3">❤️ La technologie CGM</h3>
                  <p className="text-rose-800 leading-relaxed">
                    Le <strong>CGM (Continuous Glucose Monitoring)</strong> représente une révolution dans le suivi de la santé. Ces capteurs portables mesurent en temps réel le taux de glucose dans le sang, sans prises de sang répétées. L'intégration de cette technologie dans une application numérique complète permet de <strong>prévenir les déséquilibres métaboliques</strong> avant qu'ils ne deviennent des pathologies graves.
                  </p>
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <h3 className="text-2xl font-extrabold text-gray-900">L'enjeu pour l'Afrique</h3>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Pour les familles africaines et les professionnels de santé, ces innovations représentent une évolution majeure : passer d'une médecine principalement réactive à une <strong>santé plus connectée, préventive et adaptée aux besoins de chaque personne</strong>. L'avenir de la santé sera plus personnalisé, plus accessible et davantage guidé par la technologie — offrant de nouvelles opportunités pour améliorer la qualité de vie sur le continent.
                </p>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <FadeUp delay={0.1}>
                <div className="sticky top-28 flex flex-col gap-5">
                  <div className="bg-gradient-to-br from-rose-950 to-red-900 text-white rounded-2xl p-6 shadow-xl">
                    <h3 className="font-extrabold text-xl mb-1">Rejoindre MLC</h3>
                    <p className="text-rose-200 text-sm mb-5">Obtenez vos parts gratuites et entrez dans la révolution MedTech.</p>
                    <div className="bg-rose-400/20 border border-rose-400/30 rounded-xl p-4 mb-5">
                      <p className="text-rose-200 text-xs font-bold uppercase tracking-wider mb-1">🎁 Bonus d'inscription</p>
                      <p className="text-white font-bold text-lg">200 parts offertes</p>
                      <p className="text-rose-300 text-xs mt-1">Gratuitement, après validation KYC</p>
                    </div>
                    <a href="https://mlc.health/fr/axj778" target="_blank" rel="noopener noreferrer"
                      className="group w-full bg-rose-400 hover:bg-rose-300 text-rose-950 font-extrabold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02]">
                      Obtenir mes 200 parts MLC
                      <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <p className="text-rose-400 text-xs text-center mt-3">L'investissement comporte des risques. KYC requis.</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <h4 className="font-bold text-gray-900 mb-3">Secteur</h4>
                    <div className="flex flex-wrap gap-2">
                      {["MedTech", "Santé connectée", "CGM", "Prévention", "Numérique", "Bien-être"].map(t => (
                        <span key={t} className="text-xs bg-rose-100 text-rose-700 font-semibold px-3 py-1 rounded-full">{t}</span>
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
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Les 6 raisons pour lesquelles MY LIFE CONTROL représente la prochaine révolution de la santé numérique en Afrique.</p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFacts.map((fact, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    {fact.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-rose-700 transition-colors">{fact.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{fact.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL */}
      <section className="py-24 bg-gradient-to-br from-rose-950 via-red-900 to-rose-800 text-white relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-rose-400/10" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-3xl mx-auto">Prenez le contrôle de votre santé dès aujourd'hui.</h2>
            <p className="text-rose-200 text-xl mb-10 max-w-xl mx-auto">Rejoignez MY LIFE CONTROL et obtenez gratuitement vos 200 parts dans la révolution MedTech africaine.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://mlc.health/fr/axj778" target="_blank" rel="noopener noreferrer"
                className="group bg-rose-400 hover:bg-rose-300 text-rose-950 font-extrabold px-10 py-5 rounded-xl transition-all shadow-xl text-lg inline-flex items-center gap-2 hover:scale-105">
                Obtenir mes 200 parts MLC <ExternalLink size={20} />
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
