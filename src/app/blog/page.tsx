"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight, Search, Calendar, Clock, ChevronRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
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

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tous");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (!data.error) setPosts(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const categories = ["Tous", "Technologie", "Énergie", "Investissement", "Santé / MedTech", "Divers"];
  
  const filteredPosts = activeCategory === "Tous" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="bg-light-gray min-h-screen">
      
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
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-accent blur-[120px] pointer-events-none z-[1]" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.08, 0.03] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white blur-[100px] pointer-events-none z-[1]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-6 pt-32 pb-20 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/15 text-accent text-sm font-semibold backdrop-blur-sm mb-6">
              Actualités & Analyses
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Le Blog <span className="text-accent">BAOBAB MIND & CAPITAL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Perspectives, analyses et décryptages sur l'innovation, la technologie et l'investissement en Afrique par Ousmane Zongo.
          </motion.p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════ FILTRES & ARTICLES */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Barre de filtres */}
          <FadeUp>
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-12 gap-4">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              {/* Fake Search Bar pour le design */}
              <div className="relative w-full md:w-64 shrink-0">
                <input 
                  type="text" 
                  placeholder="Rechercher un article..." 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </FadeUp>

          {/* Grille d'articles */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <FadeUp delay={0.2}>
              <div className="bg-white p-16 rounded-3xl border border-gray-100 text-center shadow-sm max-w-3xl mx-auto">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">📝</div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Articles en préparation</h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Le blog officiel de BAOBAB MIND CAPITAL est en cours d'enrichissement. Ousmane Zongo prépare actuellement des analyses pointues sur l'innovation et l'investissement. 
                  Revenez très bientôt !
                </p>
                <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md">
                  Retourner à l'accueil
                </Link>
              </div>
            </FadeUp>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((article: any, i: number) => (
                <FadeUp key={article.id} delay={i * 0.1}>
                  <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer">
                    
                    {/* Image ou Vidéo */}
                    <div className="h-56 w-full relative overflow-hidden bg-gray-100">
                      {article.videoUrl ? (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${
                            article.videoUrl.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)?.[2]
                          }?rel=0`}
                          title={article.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <>
                          <Image src={article.imageUrl} alt={article.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </>
                      )}
                      
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-4 py-2 rounded-full uppercase shadow-sm pointer-events-none">
                        {article.category}
                      </span>
                    </div>

                    {/* Contenu */}
                    <div className="p-8 flex flex-col flex-grow relative">
                      
                      {/* Méta-données */}
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-4 font-semibold">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readTime}</span>
                      </div>
                      
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors decoration-primary/30 group-hover:underline underline-offset-4">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                        {typeof article.excerpt === "string" ? article.excerpt.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : article.excerpt}
                      </p>
                      
                      {/* Ligne séparatrice animée */}
                      <div className="w-full h-px bg-gray-100 mb-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full w-0 bg-primary/20 group-hover:w-full transition-all duration-500" />
                      </div>

                      <button className="text-primary font-bold text-sm flex items-center justify-between w-full group-hover:text-primary-dark transition-colors mt-auto">
                        <span>Lire l'article complet</span>
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <ChevronRight size={18} />
                        </div>
                      </button>

                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

