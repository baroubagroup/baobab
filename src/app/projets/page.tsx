"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

// ─── Composants d'animation ──────────────────────────────────────────────────

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

// ─── Données des projets ─────────────────────────────────────────────────────

const projects = [
  {
    id: "solargroup",
    emoji: "⚡",
    name: "SOLARGROUP",
    tagline: "L'énergie de demain, disponible aujourd'hui.",
    category: "Énergie / Ingénierie",
    heroGradient: "from-sky-950 via-blue-900 to-sky-800",
    accentColor: "#38BDF8",
    accentBg: "bg-sky-400/15",
    accentText: "text-sky-300",
    borderColor: "border-sky-500/30",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <circle cx="32" cy="32" r="28" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />
        <path d="M32 12v8M32 44v8M12 32h8M44 32h8" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="32" r="10" fill="#38BDF8" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M28 32l3 3 5-6" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      "SOLARGROUP est une communauté internationale qui soutient le développement de projets technologiques dans les domaines de l'énergie, de l'ingénierie et de l'industrie. Le groupe accompagne des solutions basées sur des moteurs électriques à haut rendement, développés autour de la technologie Duyunov.",
    points: [
      "Moteurs électriques à haut rendement (technologie Duyunov)",
      "Amélioration de l'efficacité énergétique industrielle",
      "Réduction de l'impact environnemental",
      "Applications dans le transport et l'aéronautique",
      "Communauté d'investisseurs internationale active",
    ],
    bonus: "50$ offerts dès votre inscription (après validation KYC)",
    cta: "S'inscrire et obtenir mon bonus",
    href: "https://reg.solargroup.pro/fr/user/ref/plan/my-status?ref_code=djh678",

  },
  {
    id: "reactor",
    emoji: "🚀",
    name: "REACTOR / GOLDEN AFRICA",
    tagline: "La nouvelle génération de l'innovation industrielle.",
    category: "Industrie / Technologie de synthèse",
    heroGradient: "from-orange-950 via-amber-900 to-orange-800",
    accentColor: "#FB923C",
    accentBg: "bg-orange-400/15",
    accentText: "text-orange-300",
    borderColor: "border-orange-500/30",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <path d="M32 8l6 14h14l-11 9 4 14-13-9-13 9 4-14L12 22h14z" stroke="#FB923C" strokeWidth="1.5" fill="#FB923C" fillOpacity="0.15" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="6" fill="#FB923C" fillOpacity="0.3" />
        <path d="M32 26v12M26 32h12" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    description:
      "REACTOR / SINTEZMET est un projet technologique centré sur une nouvelle approche de la transformation des ressources. Grâce à la technologie brevetée Transcore™, le projet développe des procédés industriels avancés visant à produire des matériaux stratégiques via des technologies de synthèse contrôlée.",
    points: [
      "Technologie Transcore™ brevetée pour la synthèse des matériaux",
      "Production de métaux essentiels à l'économie mondiale",
      "Infrastructure industrielle évolutive et contrôle qualité rigoureux",
      "Dividendes estimés à 178 milliards USD à partir de 2029",
      "Opportunité de détention de parts exclusives",
    ],
    bonus: "Dividendes estimés à 178 Milliards USD partagés entre les détenteurs de parts dès 2029",
    cta: "Accéder à l'opportunité",
    href: "https://goldenafrica-invest.com/sign-up?ref=G4A4222Y",

  },
  {
    id: "aureus",
    emoji: "🌍",
    name: "AUREUS ALLIANCE HOLDINGS",
    tagline: "L'investissement aurifère réinventé pour l'Afrique.",
    category: "Investissement Aurifère",
    heroGradient: "from-yellow-950 via-yellow-900 to-amber-800",
    accentColor: "#FBBF24",
    accentBg: "bg-yellow-400/15",
    accentText: "text-yellow-300",
    borderColor: "border-yellow-500/30",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <polygon points="32,8 56,20 56,44 32,56 8,44 8,20" stroke="#FBBF24" strokeWidth="1.5" fill="#FBBF24" fillOpacity="0.1" />
        <circle cx="32" cy="32" r="10" fill="#FBBF24" fillOpacity="0.3" stroke="#FBBF24" strokeWidth="1.5" />
        <path d="M28 32l3 3 5-6" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      "AUREUS ALLIANCE HOLDINGS développe une approche moderne de l'industrie aurifère, basée sur des projets miniers responsables, une production réelle d'or et une gouvernance transparente. Sa vision : créer des écosystèmes intégrant exploitation durable, innovation technologique et développement communautaire en Afrique.",
    points: [
      "Exploitation minière durable et gouvernance transparente",
      "Production réelle d'or — actif tangible et solide",
      "1 000$ de titres financiers offerts dès l'inscription KYC",
      "Développement des communautés locales africaines",
      "Approche moderne et internationale de l'industrie aurifère",
    ],
    bonus: "Titres financiers d'une valeur de 1 000$ dès l'inscription validée",
    cta: "Créer mon compte AUREUS",
    href: "https://www.aureus.africa/zousmane",

  },
  {
    id: "mlc",
    emoji: "❤️",
    name: "MY LIFE CONTROL (MLC)",
    tagline: "La technologie au service d'une meilleure santé.",
    category: "MedTech / Santé connectée",
    heroGradient: "from-rose-950 via-red-900 to-rose-800",
    accentColor: "#F87171",
    accentBg: "bg-red-400/15",
    accentText: "text-red-300",
    borderColor: "border-red-500/30",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <path d="M32 54s-24-14-24-30a16 16 0 0132 0 16 16 0 0132 0c0 16-24 30-24 30h-16z" stroke="#F87171" strokeWidth="1.5" fill="#F87171" fillOpacity="0.15" strokeLinejoin="round" />
        <path d="M22 32h6l3-6 4 12 3-6h4" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      "MY LIFE CONTROL (MLC) est un projet international de MedTech qui développe des solutions numériques innovantes pour accompagner une nouvelle génération de soins de santé personnalisés. MLC s'intéresse aux technologies de surveillance continue (CGM) pour un meilleur suivi des données de santé et une approche proactive de la prévention.",
    points: [
      "Technologies CGM pour la surveillance continue (glycémie, etc.)",
      "Applications numériques de suivi et de prévention",
      "200 parts offertes gratuitement dès l'inscription KYC",
      "Approche préventive et personnalisée de la santé",
      "Solution adaptée au contexte africain et à ses enjeux sanitaires",
    ],
    bonus: "200 parts du projet offertes gratuitement dès votre inscription (après validation KYC)",
    cta: "Obtenir mes 200 parts MLC",
    href: "https://mlc.health/fr/axj778",

  },
];

// ─── Card projet (grande) ─────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Numéro géant en fond */}
      <div className="absolute -top-8 left-4 text-[120px] font-black text-gray-100 select-none leading-none z-0 hidden lg:block">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className={`relative z-10 flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-100`}
      >
        {/* Panneau gauche — image / visuel — CLIQUABLE vers la page dédiée */}
        <Link
          href={`/projets/${project.id}`}
          className={`relative lg:w-2/5 min-h-64 lg:min-h-auto bg-gradient-to-br ${project.heroGradient} flex flex-col justify-between p-8 group/panel cursor-pointer`}
        >
          {/* Motif de fond géométrique subtil en filigrane (zéro texte parasite) */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Blob déco */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
            style={{ background: project.accentColor }}
          />

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-white/0 group-hover/panel:bg-white/5 transition-all duration-300 rounded-l-3xl z-[1]" />

          <div className="relative z-10">
            {/* Catégorie */}
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${project.accentBg} ${project.accentText} border ${project.borderColor} backdrop-blur-sm`}>
              {project.category}
            </span>
          </div>

          {/* Icône centrale */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex justify-center items-center my-8"
          >
            <div className="w-28 h-28 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center shadow-xl backdrop-blur-sm group-hover/panel:scale-110 transition-transform duration-300">
              <span className="text-6xl">{project.emoji}</span>
            </div>
          </motion.div>

          {/* Nom en bas */}
          <div className="relative z-10">
            <h3 className="text-white font-extrabold text-2xl md:text-3xl leading-tight group-hover/panel:underline decoration-2 underline-offset-4">
              {project.name}
            </h3>
            <p style={{ color: project.accentColor }} className="text-sm font-medium mt-1 opacity-90">
              {project.tagline}
            </p>
            {/* Indicateur "cliquer pour en savoir plus" */}
            <span className="inline-flex items-center gap-1.5 mt-3 text-white/60 text-xs group-hover/panel:text-white/90 transition-colors">
              <ArrowRight size={13} className="group-hover/panel:translate-x-1 transition-transform" />
              Cliquer pour en savoir plus
            </span>
          </div>
        </Link>

        {/* Panneau droit — contenu */}
        <div className="lg:w-3/5 bg-white p-8 md:p-10 flex flex-col gap-6">
          {/* Icon SVG + Nom cliquable */}
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${project.accentBg} flex items-center justify-center border ${project.borderColor} shrink-0`}>
              {project.icon}
            </div>
            <div>
              <Link href={`/projets/${project.id}`} className="group/name">
                <h4 className="text-xl font-extrabold text-gray-900 group-hover/name:text-primary transition-colors underline-offset-4 group-hover/name:underline">
                  {project.name}
                </h4>
              </Link>
              <p className="text-sm text-gray-500">{project.category}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-base">{project.description}</p>

          {/* Points clés */}
          <div className="flex flex-col gap-3">
            <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Points clés</h5>
            <ul className="flex flex-col gap-2.5">
              {project.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <svg className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke={project.accentColor} strokeWidth="1.5" />
                    <path d="M6.5 10l2.5 2.5 4.5-5" stroke={project.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bonus badge */}
          <div className={`${project.accentBg} border ${project.borderColor} rounded-xl p-4 flex gap-3 items-start`}>
            <span className="text-2xl shrink-0">🎁</span>
            <div>
              <p className="font-bold text-gray-900 text-sm">Bonus exclusif</p>
              <p className="text-gray-600 text-sm mt-0.5">{project.bonus}</p>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
            {/* CTA principal — lien externe affiliation */}
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 inline-flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] text-sm"
            >
              {project.cta}
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Bouton "En savoir plus" — page dédiée interne */}
            <Link
              href={`/projets/${project.id}`}
              className="group flex-1 inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-xl transition-all text-sm border-2"
              style={{ borderColor: project.accentColor, color: project.accentColor }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = project.accentColor;
                (e.currentTarget as HTMLElement).style.color = "#0A3D5C";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = project.accentColor;
              }}
            >
              En savoir plus
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-xs text-gray-400 text-center -mt-1">
            Inscription avec KYC obligatoire. L'investissement comporte des risques.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-white">

      {/* ══════════════════════════════════════════════════ HERO */}
      <section
        ref={heroRef}
        className="relative bg-primary-dark text-white min-h-[65vh] flex items-center overflow-hidden"
      >
        {/* Arrière-plan du Hero */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-[#0B4624] to-[#07381B]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
        </div>

        {/* Particules / grille */}
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Blobs animés */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent blur-[100px] pointer-events-none z-[1]"
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 md:px-6 py-24 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/15 text-accent text-sm font-semibold backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Opportunités technologiques
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
            >
              Nos <span className="text-accent">Projets</span><br />Phares
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-10"
            >
              Une plateforme de découverte des projets technologiques, scientifiques et économiques suivis par BAOBAB Mind & Capital. Le futur appartient à ceux qui comprennent les changements d'aujourd'hui.
            </motion.p>

            {/* Stats rapides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-6 pt-6 border-t border-white/10"
            >
              {[
                { n: "4", label: "Projets actifs" },
                { n: "4", label: "Secteurs couverts" },
                { n: "🌍", label: "Portée internationale" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-accent">{s.n}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════ INTRO */}
      <section className="py-16 bg-light-gray border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
              Notre objectif est de présenter des informations accessibles permettant à chacun de mieux comprendre les innovations technologiques émergentes.
            </h2>
            <p className="text-gray-600 text-lg">
              Chaque projet présenté ici a été sélectionné par Ousmane Zongo pour son fort potentiel technologique, son sérieux et sa capacité à créer de la valeur pour les entrepreneurs et investisseurs africains.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ PROJETS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl flex flex-col gap-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ CTA FINAL */}
      <section className="py-24 bg-primary-dark text-white relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5"
        />

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-3xl mx-auto leading-tight">
              Vous avez des questions sur l'un de ces projets ?
            </h2>
            <p className="text-gray-300 text-xl mb-10 max-w-xl mx-auto">
              Ousmane Zongo et son équipe sont disponibles pour vous accompagner et répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/22664240227?text=Bonjour,%20je%20souhaite%20avoir%20plus%20d%27informations%20sur%20vos%20projets."
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-10 py-5 rounded-xl transition-all shadow-xl text-lg inline-flex items-center gap-2 hover:scale-105"
              >
                Contacter via WhatsApp
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-10 py-5 rounded-xl transition-all text-lg backdrop-blur-sm"
              >
                Voir nos coordonnées
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

