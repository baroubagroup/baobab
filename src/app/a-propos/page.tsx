"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// ─── Composants d'animation réutilisables ───────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
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

function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Timeline data ───────────────────────────────────────────────────────────
const timelineItems = [
  {
    emoji: "💡",
    title: "La naissance d'une vision",
    text: "Chaque grande aventure commence par une conviction profonde : celle qu'un meilleur avenir est possible. Très tôt, Ousmane Zongo développe une vision tournée vers la création de valeur, l'innovation et la construction de solutions adaptées aux réalités africaines. Son ambition n'est pas seulement de participer à l'évolution du continent, mais de contribuer activement à son accélération.",
  },
  {
    emoji: "🎯",
    title: "Un leader orienté impact",
    text: "Être un leader ne signifie pas seulement diriger. Cela signifie inspirer, rassembler et donner une direction claire. À travers son engagement, Ousmane Zongo porte une vision où la technologie devient un outil d'émancipation, permettant aux entreprises, aux jeunes talents et aux organisations de mieux répondre aux défis modernes. Son approche combine innovation, développement des compétences, partenariats stratégiques et solutions durables.",
  },
  {
    emoji: "🔄",
    title: "Transformer les défis en opportunités",
    text: "Les grands leaders se distinguent par leur capacité à voir des opportunités là où d'autres voient uniquement des difficultés. Dans un environnement marqué par des mutations rapides, Ousmane Zongo défend une philosophie : chaque défi peut devenir le point de départ d'une nouvelle innovation. La transformation digitale, l'intelligence artificielle et les nouvelles technologies ne sont pas seulement des tendances — ce sont des outils capables d'améliorer les entreprises, les services et les conditions de vie.",
  },
  {
    emoji: "🌍",
    title: "Construire l'avenir avec une vision africaine",
    text: "Le leadership d'Ousmane Zongo s'inscrit dans une dynamique plus large : celle d'une Afrique créative, connectée et ambitieuse. Son objectif est de contribuer à bâtir des écosystèmes où entrepreneurs, ingénieurs, investisseurs et communautés collaborent pour faire émerger des projets à fort impact — car le futur ne se construit pas uniquement avec des technologies avancées, mais aussi avec des femmes et des hommes capables de porter une vision.",
  },
  {
    emoji: "🏛️",
    title: "La mission d'un bâtisseur",
    text: "Un véritable leader laisse une empreinte qui dépasse sa propre réussite. La mission d'Ousmane Zongo est portée par une ambition : encourager une génération de bâtisseurs africains capables d'imaginer, créer et développer les solutions du monde de demain. Son parcours rappelle une vérité essentielle : les grandes transformations commencent par une vision, mais elles deviennent réalité grâce aux leaders qui osent agir.",
  },
  {
    emoji: "🚀",
    title: "Un héritage pour demain",
    text: "À travers son engagement dans l'innovation et la transformation numérique, Ousmane Zongo représente une nouvelle génération de leaders africains : des visionnaires qui comprennent que la technologie n'a de valeur que lorsqu'elle améliore la vie des personnes et crée des opportunités durables. Son histoire continue de s'écrire, avec une ambition claire : participer à la construction d'un avenir africain plus intelligent, plus connecté et plus prospère.",
  },
];

// ─── Valeurs ─────────────────────────────────────────────────────────────────
const valeurs = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <circle cx="20" cy="20" r="16" stroke="#D4A843" strokeWidth="1.5" />
        <path d="M13 20l5 5 9-9" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Innovation",
    desc: "Adopter les technologies émergentes pour construire des solutions à fort potentiel.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <path d="M20 4l4.5 9.5L34 15l-7 7 1.5 10L20 27l-8.5 5L13 22l-7-7 9.5-1.5z" stroke="#D4A843" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Excellence",
    desc: "Viser les standards internationaux dans chaque projet accompagné.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <circle cx="14" cy="16" r="5" stroke="#D4A843" strokeWidth="1.5" />
        <circle cx="26" cy="16" r="5" stroke="#D4A843" strokeWidth="1.5" />
        <path d="M6 32c0-5 3.5-8 8-8m12 8c0-5-3.5-8-8-8M20 28c3 0 6 2 6 4" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Impact Collectif",
    desc: "Créer de la valeur durable pour les communautés et les entrepreneurs africains.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <path d="M20 6v6M20 28v6M6 20h6M28 20h6" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="8" stroke="#D4A843" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="#D4A843" opacity="0.4" />
      </svg>
    ),
    title: "Vision Stratégique",
    desc: "Anticiper les changements pour positionner l'Afrique en leader technologique.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-white">

      {/* ══════════════════════════════════════════════════ HERO */}
      <section
        ref={heroRef}
        className="relative bg-primary-dark text-white min-h-[70vh] flex items-center overflow-hidden"
      >
        {/* Image de fond avec opacité */}
        <div className="absolute inset-0 z-0">
          {/* ⬇ Remplacez : public/images/image_bg_vision.png (photo large du leader ou paysage africain) */}
          <Image src="/images/pdg.webp" alt="Background Vision" fill priority className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-primary-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
        </div>

        {/* Blobs animés */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-accent blur-[120px]"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 md:px-6 py-24 relative z-10"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/15 text-accent text-sm font-semibold backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Notre Vision
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
            >
              Ousmane Zongo :<br />
              <span className="text-accent">Vision 2030</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
            >
              La vision d'un leader africain qui transforme les idées en impact. Créer des leaders et bâtisseurs africains via les technologies, l'innovation et les opportunités — pour une Afrique prospère.
            </motion.p>

            {/* Ligne animée */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="mt-10 h-0.5 w-32 bg-gradient-to-r from-accent to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════ BIO + PHOTO */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Photo sticky à gauche */}
            <SlideIn direction="left" className="lg:w-2/5">
              <div className="sticky top-28">
                <div className="relative">
                  {/* Cadre décoratif */}
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/30 rounded-2xl" />

                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] bg-gray-100">
                    {/* ⬇ Remplacez : public/images/image_page_Notre_Vision.png */}
                    <Image src="/images/pdg.webp" alt="Ousmane Zongo" width={400} height={533} className="w-full h-full object-cover" />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-transparent to-transparent" />

                    {/* Badge en bas de la photo */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-extrabold text-2xl">Ousmane Zongo</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <p className="text-accent text-sm font-semibold uppercase tracking-widest">
                          Fondateur & PDG
                        </p>
                      </div>
                      <p className="text-gray-300 text-sm mt-2">
                        BAOBAB Mind & Capital — Ouagadougou 🇧🇫
                      </p>
                    </div>
                  </div>

                  {/* Badge flottant animé */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 bg-accent text-primary-dark px-4 py-2 rounded-xl text-sm font-extrabold shadow-lg shadow-accent/30"
                  >
                    Vision 2030 🌍
                  </motion.div>
                </div>

                {/* Bloc citation */}
                <FadeUp delay={0.2} className="mt-8">
                  <div className="bg-primary-dark text-white p-6 rounded-2xl border-l-4 border-accent relative overflow-hidden">
                    <div className="absolute top-2 right-4 text-6xl text-white/5 font-serif select-none">"</div>
                    <p className="text-gray-300 italic leading-relaxed relative z-10">
                      "Les grandes transformations commencent toujours par une vision, mais elles deviennent réalité grâce aux leaders qui osent agir."
                    </p>
                    <p className="text-accent font-bold text-sm mt-3">— Ousmane Zongo</p>
                  </div>
                </FadeUp>
              </div>
            </SlideIn>

            {/* Contenu textuel à droite */}
            <SlideIn direction="right" className="lg:w-3/5 flex flex-col gap-10">

              {/* Encadré mission */}
              <FadeUp>
                <div className="bg-gradient-to-br from-primary-dark to-primary p-8 rounded-2xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <h2 className="text-2xl font-extrabold mb-4 relative z-10">
                    VISION ZONGO 2030
                  </h2>
                  <p className="text-gray-200 text-lg font-medium mb-4 relative z-10">
                    Créer des Milliardaires Africains via Technologies, Innovation et Opportunités pour une Afrique prospère.
                  </p>
                  <p className="text-gray-300 leading-relaxed relative z-10">
                    Ousmane Zongo est un entrepreneur, investisseur et promoteur engagé dans l'identification et l'accompagnement de projets innovants à fort potentiel technologique.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3 relative z-10">
                    {[
                      "Innovation technologique",
                      "Opportunités numériques",
                      "Solutions du futur",
                      "Passerelles internationales",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-sm text-gray-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Intro */}
              <FadeUp delay={0.1}>
                <div>
                  <h3 className="text-3xl font-extrabold text-foreground mb-4">
                    Ousmane Zongo : La vision d'un leader africain
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Dans un monde où la technologie redéfinit les frontières du possible, certains leaders ne se contentent pas de suivre les changements : ils choisissent de les créer. Le parcours d'Ousmane Zongo incarne cette nouvelle génération d'acteurs africains convaincus que l'innovation, la connaissance et l'engagement peuvent devenir des leviers majeurs de transformation.
                  </p>
                </div>
              </FadeUp>

              {/* Sa démarche */}
              <FadeUp delay={0.1}>
                <div className="bg-light-gray rounded-2xl p-7">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Sa démarche repose sur une idée simple mais puissante :{" "}
                    <strong className="text-primary">
                      l'Afrique possède les talents, les ressources et l'intelligence
                    </strong>{" "}
                    nécessaires pour construire ses propres solutions technologiques et économiques. Il ne s'agit pas d'importer des modèles étrangers, mais de créer des solutions africaines, adaptées aux réalités du continent, capables de rayonner à l'international.
                  </p>
                </div>
              </FadeUp>

              {/* Domaines d'engagement */}
              <FadeUp delay={0.15}>
                <h3 className="text-2xl font-extrabold text-foreground mb-4">
                  Ses domaines d'engagement
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: "⚡", label: "Énergie nouvelle génération", detail: "Moteurs électriques, énergies propres et solutions industrielles durables." },
                    { icon: "🏭", label: "Technologies industrielles avancées", detail: "Transcore™, synthèse de matériaux stratégiques, innovation manufacturière." },
                    { icon: "💰", label: "Investissement & ressources aurifères", detail: "Vision moderne et durable de l'industrie minière africaine." },
                    { icon: "❤️", label: "Santé & longévité numérique", detail: "MedTech, dispositifs connectés, prévention et bien-être personnalisé." },
                  ].map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all group"
                    >
                      <span className="text-2xl">{d.icon}</span>
                      <div>
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">{d.label}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{d.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeUp>

            </SlideIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ TIMELINE */}
      <section className="py-24 bg-light-gray overflow-hidden relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />

        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <FadeUp className="text-center mb-20">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-4 block">
              Parcours & Philosophie
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              La philosophie d'<span className="text-primary">un bâtisseur</span>
            </h2>
          </FadeUp>

          <div className="flex flex-col gap-8">
            {timelineItems.map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex gap-6 items-start ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
                >
                  {/* Indicateur */}
                  <div className="flex flex-col items-center gap-2 shrink-0 lg:w-1/2 justify-end" style={i % 2 !== 0 ? { alignItems: "flex-start" } : { alignItems: "flex-end" }}>
                    <div className="w-14 h-14 rounded-2xl bg-primary-dark border border-white/10 flex items-center justify-center shadow-lg text-2xl">
                      {item.emoji}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="bg-white border border-gray-100 p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-grow relative group">
                    <div className="absolute top-6 -left-2 w-4 h-4 bg-white border-l border-b border-gray-100 rotate-45 hidden lg:block" />
                    <h3 className="text-xl font-extrabold text-primary-dark mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ VALEURS */}
      <section className="py-24 bg-primary-dark text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <FadeUp className="text-center mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-[0.25em] mb-4 block">
              Principes directeurs
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Les valeurs de <span className="text-accent">BAOBAB</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((v, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/8 group-hover:to-transparent transition-all duration-500 rounded-2xl" />
                  <div className="w-14 h-14 bg-white/8 group-hover:bg-white/12 rounded-xl flex items-center justify-center transition-colors">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {v.desc}
                  </p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ CITATION + CTA */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeUp>
            <div className="relative mb-16">
              <div className="text-8xl text-primary/10 font-serif absolute -top-8 left-1/2 -translate-x-1/2 select-none leading-none">
                "
              </div>
              <p className="text-3xl md:text-4xl font-extrabold text-primary-dark leading-snug relative z-10 pt-8">
                Ousmane Zongo : une vision aujourd'hui,{" "}
                <span className="text-primary">un héritage demain.</span>
              </p>
              <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
                À travers son engagement dans l'innovation et la transformation numérique, Ousmane Zongo représente une nouvelle génération de leaders africains. Des visionnaires qui comprennent que la technologie n'a de valeur que lorsqu'elle améliore la vie des personnes et crée des opportunités durables.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projets"
                className="group bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Découvrir nos projets
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group bg-light-gray hover:bg-gray-200 text-primary-dark font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Contacter Ousmane Zongo
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}



