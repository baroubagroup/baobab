"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ─── Données ────────────────────────────────────────────────────────────────

const expertise = [
  {
    number: "01",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="20" stroke="#D4A843" strokeWidth="2" />
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="#D4A843" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="7" fill="#D4A843" opacity="0.3"/>
        <path d="M24 17v7l5 3" stroke="#D4A843" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Énergie Nouvelle Génération",
    desc: "Solutions énergétiques révolutionnaires, moteurs électriques à haut rendement et technologies propres pour l'industrie de demain.",
    stat: "4 pays couverts",
  },
  {
    number: "02",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="8" y="8" width="14" height="14" rx="2" stroke="#D4A843" strokeWidth="2"/>
        <rect x="26" y="8" width="14" height="14" rx="2" stroke="#D4A843" strokeWidth="2"/>
        <rect x="8" y="26" width="14" height="14" rx="2" stroke="#D4A843" strokeWidth="2"/>
        <rect x="26" y="26" width="14" height="14" rx="2" fill="#D4A843" opacity="0.3" stroke="#D4A843" strokeWidth="2"/>
        <path d="M29 33h6M32 30v6" stroke="#D4A843" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Technologies Avancées",
    desc: "Innovation industrielle de pointe avec la technologie Transcore™, synthèse de matériaux stratégiques et procédés de fabrication nouvelle génération.",
    stat: "Tech propriétaires",
  },
  {
    number: "03",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <polygon points="24,6 44,18 44,38 24,44 4,38 4,18" stroke="#D4A843" strokeWidth="2" fill="#D4A843" fillOpacity="0.1"/>
        <circle cx="24" cy="26" r="7" fill="#D4A843" opacity="0.3"/>
        <path d="M24 12l2.5 7H34l-6 4.5 2.5 7-7-5-7 5 2.5-7-6-4.5h7.5z" stroke="#D4A843" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Investissement Aurifère",
    desc: "Nouvelle vision de l'industrie minière africaine — durable, transparente et ancrée dans des projets à production réelle avec gouvernance internationale.",
    stat: "Rendements tangibles",
  },
  {
    number: "04",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M24 6C14 6 6 14 6 24c0 5.5 2.5 10.5 6.5 14L24 26l11.5 12C39.5 34.5 42 29.5 42 24c0-10-8-18-18-18z" stroke="#D4A843" strokeWidth="2" fill="#D4A843" fillOpacity="0.1"/>
        <path d="M24 18v6l4 4" stroke="#D4A843" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="3" fill="#D4A843"/>
      </svg>
    ),
    title: "Santé & Longévité",
    desc: "MedTech innovant : dispositifs de surveillance continue (CGM), applications numériques et solutions préventives pour une santé connectée et accessible.",
    stat: "200+ bénéficiaires",
  },
];

const projects = [
  {
    id: "solargroup",
    emoji: "⚡",
    name: "SOLARGROUP",
    category: "Énergie / Ingénierie",
    shortDesc: "Moteurs électriques à haut rendement et énergie de demain. Une communauté internationale d'investissement.",
    gradient: "from-sky-900 to-blue-700",
    badge: "bg-blue-400/20 text-blue-200",
    href: "/projets/solargroup",
  },
  {
    id: "reactor",
    emoji: "🚀",
    name: "REACTOR / GOLDEN AFRICA",
    category: "Industrie / Technologie",
    shortDesc: "Technologie Transcore™ pour la production de métaux stratégiques. L'industrie de demain, aujourd'hui.",
    gradient: "from-orange-900 to-amber-700",
    badge: "bg-orange-400/20 text-orange-200",
    href: "/projets/reactor",
  },
  {
    id: "aureus",
    emoji: "🌍",
    name: "AUREUS ALLIANCE",
    category: "Investissement Aurifère",
    shortDesc: "L'industrie minière africaine réinventée — durable, transparente, à fort impact économique local.",
    gradient: "from-yellow-900 to-yellow-600",
    badge: "bg-yellow-400/20 text-yellow-200",
    href: "/projets/aureus",
  },
  {
    id: "mlc",
    emoji: "❤️",
    name: "MY LIFE CONTROL",
    category: "Santé / MedTech",
    shortDesc: "Révolution de la santé numérique avec des dispositifs intelligents de surveillance continue.",
    gradient: "from-rose-900 to-red-700",
    badge: "bg-red-400/20 text-red-200",
    href: "/projets/mlc",
  },
];

// ─── Composants d'animation réutilisables ───────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

function SlideIn({ children, direction = "left", delay = 0, className = "" }: { children: React.ReactNode; direction?: "left" | "right"; delay?: number; className?: string }) {
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

// ─── Compteur animé ──────────────────────────────────────────────────────────
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = value / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// ─── Page principale ─────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/posts").then(r => r.json()).then(d => { if (!d.error) setBlogPosts(d.slice(0, 3)); }).catch(() => {});
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════ HERO */}
      <section ref={heroRef} className="relative bg-primary-dark text-white min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        {/* Particules / blobs de fond (masqués sur mobile pour fluidité maximale du scroll) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="hidden md:block">
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-accent blur-[120px]" />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -bottom-20 right-0 w-[500px] h-[500px] rounded-full bg-primary blur-[100px]" />
          </div>
          {/* Grille de points */}
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-6 py-16 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Texte principal */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/15 text-accent text-xs sm:text-sm font-semibold backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Basé à Ouagadougou 🇧🇫 — Actif à l'international
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight"
              >
                Façonnons ensemble les{" "}
                <span className="relative inline-block">
                  <span className="text-accent">écosystèmes</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  />
                </span>{" "}
                technologiques du futur
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                À travers <strong className="text-white">BAOBAB MIND & CAPITAL</strong>, Ousmane Zongo accompagne les entrepreneurs et investisseurs africains et participe au développement d'écosystèmes innovants dans les domaines de l'énergie, des technologies avancées, de la santé et des solutions numériques.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto justify-center lg:justify-start"
              >
                <Link href="/projets" className="group bg-accent hover:bg-yellow-400 text-primary-dark font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25 hover:shadow-accent/40 text-sm sm:text-base">
                  Découvrir nos projets
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="group bg-white/8 hover:bg-white/15 border border-white/20 text-white font-medium px-8 py-4 rounded-xl transition-all flex items-center justify-center backdrop-blur-sm text-sm sm:text-base">
                  Nous contacter
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-4 border-t border-white/10 w-full"
              >
                {[
                  { value: 4, label: "Projets phares", suffix: "" },
                  { value: 2030, label: "Vision horizon", suffix: "" },
                  { value: 12, label: "Années d'expérience", suffix: "+" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl sm:text-3xl font-extrabold text-accent">
                      <AnimatedCounter value={s.value} />{s.suffix}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image de couverture horizontale (Équipe & Leadership industriel international) */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-lg lg:max-w-xl group">
                {/* Glow subtil doré et vert */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-accent/30 via-primary/30 to-accent/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 pointer-events-none" />

                {/* Cadre de l'image horizontale 16:9 */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-primary-dark">
                  <Image
                    src="/images/hero_cover.webp"
                    alt="Ousmane Zongo avec son équipe industrielle — BAOBAB Mind & Capital"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />

                  {/* Dégradé doux pour lisibilité */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent pointer-events-none" />

                  {/* Badge en bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-white font-extrabold text-base sm:text-lg tracking-wide drop-shadow-md">
                        Ousmane Zongo & Équipes
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <p className="text-accent text-xs font-bold uppercase tracking-wider">
                          Leadership • Industrie & Innovation
                        </p>
                      </div>
                    </div>

                    <span className="bg-accent text-primary-dark font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-md">
                      Vision 2030 🌍
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════ QUI SOMMES-NOUS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <SlideIn direction="left" className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-32 h-32 border-4 border-accent/20 rounded-2xl" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 rounded-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/5]">
                  {/* ⬇ Remplacez : public/images/image_section_vision.png */}
                  <img src="/images/pdg.webp" alt="Ousmane Zongo — Vision" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent flex items-end p-8">
                    <blockquote className="text-white font-serif italic text-lg leading-snug">
                      "Les grandes transformations commencent toujours par la connaissance."
                    </blockquote>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right" className="lg:w-1/2 flex flex-col gap-6">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.25em]">Qui sommes-nous</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                La <span className="text-primary">Vision ZONGO 2030</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ousmane Zongo est un entrepreneur, investisseur et promoteur engagé dans l'identification et l'accompagnement de projets innovants à fort potentiel technologique. Le monde évolue rapidement avec l'émergence de nouvelles technologies capables de transformer notre manière de produire, d'investir, de travailler et de vivre.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Notre ambition est claire : <strong className="text-primary">créer des leaders et bâtisseurs africains</strong> grâce aux technologies, à l'innovation et aux opportunités — pour une Afrique prospère et compétitive sur l'échiquier mondial.
              </p>
              <p className="text-gray-600 leading-relaxed">
                À travers BAOBAB MIND & CAPITAL, Ousmane Zongo développe une vision orientée vers l'innovation technologique, l'accès aux nouvelles opportunités numériques, la vulgarisation des solutions du futur et la création de passerelles entre investisseurs africains et écosystèmes internationaux.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div className="flex items-center gap-3 bg-light-gray p-4 rounded-xl flex-1">
                  <span className="text-3xl">🚀</span>
                  <div>
                    <p className="font-bold text-foreground">Innovation</p>
                    <p className="text-xs text-gray-500">Technologies émergentes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-light-gray p-4 rounded-xl flex-1">
                  <span className="text-3xl">🌱</span>
                  <div>
                    <p className="font-bold text-foreground">Impact Durable</p>
                    <p className="text-xs text-gray-500">Écosystèmes africains</p>
                  </div>
                </div>
              </div>

              <Link href="/a-propos" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all mt-2">
                En savoir plus sur notre vision <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </SlideIn>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ EXPERTISES */}
      <section className="py-24 bg-primary-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold text-accent uppercase tracking-[0.25em] mb-4 block">Secteurs Stratégiques</span>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Nos domaines<br /><span className="text-accent">d'expertise</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-7 h-full flex flex-col gap-5 cursor-pointer overflow-hidden"
                >
                  {/* Glow au hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />
                  
                  {/* Numéro en fond */}
                  <span className="absolute top-4 right-5 text-6xl font-black text-white/4 group-hover:text-white/8 transition-colors select-none">
                    {item.number}
                  </span>

                  {/* Icône */}
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                    className="w-16 h-16 bg-white/8 group-hover:bg-white/12 rounded-xl flex items-center justify-center transition-colors"
                  >
                    {item.icon}
                  </motion.div>

                  <div className="flex flex-col gap-3 flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors leading-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs text-accent font-semibold">{item.stat}</span>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      className="text-gray-500 group-hover:text-accent transition-colors"
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ PROJETS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left mb-14 gap-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 block">Opportunités</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                Nos projets <span className="text-primary">phares</span>
              </h2>
            </div>
            <Link href="/projets" className="group inline-flex items-center gap-2 text-primary font-semibold text-sm border border-primary/30 px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shrink-0">
              Voir tous les projets <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <FadeUp key={project.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} text-white h-full flex flex-col`}
                  style={{ minHeight: "320px" }}
                >
                  {/* Blob décoratif */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500" />

                  <div className="relative z-10 p-7 flex flex-col gap-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="text-4xl">{project.emoji}</div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${project.badge}`}>
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold leading-tight">{project.name}</h3>
                    <p className="text-white/70 text-sm leading-relaxed flex-grow">{project.shortDesc}</p>

                    <Link
                      href={project.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white mt-auto group-hover:gap-3 transition-all"
                    >
                      Découvrir le projet
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Ligne décorative en bas */}
                  <div className="h-1 w-0 group-hover:w-full bg-accent transition-all duration-500 ease-out" />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ BLOG APERÇU */}
      <section className="py-24 bg-light-gray overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left mb-14 gap-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 block">Actualités</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                Le blog <span className="text-primary">BAOBAB</span>
              </h2>
            </div>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-primary font-semibold text-sm border border-primary/30 px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shrink-0">
              Tous les articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>

          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post: any, i: number) => (
                <FadeUp key={post.id} delay={i * 0.15}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow h-full flex flex-col group"
                  >
                    <div className="h-48 overflow-hidden bg-gray-200 relative">
                      <Image src={post.imageUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <span className="absolute top-4 left-4 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{post.category}</span>
                    </div>
                    <div className="p-6 flex flex-col flex-grow gap-3">
                      <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString('fr-FR')} · {post.readTime}</p>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
                        {typeof post.excerpt === "string" ? post.excerpt.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-2 group-hover:gap-2.5 transition-all">
                        Lire l'article <ArrowRight size={15} />
                      </span>
                    </div>
                  </motion.article>
                </FadeUp>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { cat: "Énergie", title: "Pourquoi l'énergie propre est la clé du développement africain", desc: "Une analyse approfondie des opportunités offertes par les technologies énergétiques de nouvelle génération." },
                { cat: "Investissement", title: "5 raisons d'investir dans la tech industrielle en 2026", desc: "Comment les procédés de synthèse avancés redéfinissent la valeur des ressources stratégiques africaines." },
                { cat: "Santé / MedTech", title: "La santé connectée : révolution ou évolution pour l'Afrique ?", desc: "Du suivi continu à la prévention personnalisée — le numérique transforme la médecine du continent." },
              ].map((a, i) => (
                <FadeUp key={i} delay={i * 0.15}>
                  <motion.article whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col group cursor-not-allowed opacity-80">
                    <div className="h-48 bg-gradient-to-br from-primary/30 to-primary-dark/60 flex items-center justify-center relative">
                      <span className="text-5xl opacity-30">📰</span>
                      <span className="absolute top-4 left-4 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{a.cat}</span>
                      <span className="absolute top-4 right-4 bg-accent text-primary-dark text-xs font-bold px-2.5 py-1 rounded-full">Bientôt</span>
                    </div>
                    <div className="p-6 flex flex-col gap-3">
                      <h3 className="text-lg font-bold text-gray-900 leading-snug">{a.title}</h3>
                      <p className="text-sm text-gray-600">{a.desc}</p>
                    </div>
                  </motion.article>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ CTA FINAL */}
      <section className="py-24 bg-primary-dark text-white relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/10" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5" />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-4xl mx-auto">
              Prêt à explorer les opportunités technologiques <span className="text-accent">du futur ?</span>
            </h2>
            <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
              Rejoignez Ousmane Zongo et la communauté BAOBAB Mind & Capital dans la construction d'une Afrique prospère et innovante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projets" className="group bg-accent hover:bg-yellow-400 text-primary-dark font-extrabold px-10 py-5 rounded-xl transition-all shadow-xl shadow-accent/20 hover:shadow-accent/40 text-lg inline-flex items-center gap-2 hover:scale-105">
                Voir tous les projets
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="group bg-white/8 hover:bg-white/15 border border-white/20 text-white font-bold px-10 py-5 rounded-xl transition-all text-lg backdrop-blur-sm">
                Contacter Ousmane Zongo
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}




