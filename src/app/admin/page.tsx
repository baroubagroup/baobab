"use client";

import { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, PenTool, Settings, LogOut, 
  UploadCloud, Video, Calendar, Map, CheckCircle2, 
  TrendingUp, Users, Lock, ChevronDown, Image as ImageIcon, 
  Wand2, Bold, Italic, Palette, Trash2, ExternalLink, Sparkles, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("analytics");

  if (!isAuthenticated) return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-primary-dark text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-black tracking-widest text-white">
            BAOBAB <span className="text-accent">ADMIN</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Espace gestion site web</p>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <SidebarButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={<LayoutDashboard size={20} />} label="Tableau de bord" />
          <SidebarButton active={activeTab === "blog"} onClick={() => setActiveTab("blog")} icon={<PenTool size={20} />} label="Gestion du Blog (IA)" />
          <SidebarButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={<Settings size={20} />} label="Paramètres" />
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
            <LogOut size={20} /> Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-10">
        <AnimatePresence mode="wait">
          {activeTab === "analytics" && <TabAnalytics key="analytics" />}
          {activeTab === "blog" && <TabBlog key="blog" />}
          {activeTab === "settings" && <TabSettings key="settings" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function SidebarButton({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? "bg-accent text-primary-dark shadow-md" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
      {icon} {label}
    </button>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "login", username, password }) });
      const data = await res.json();
      if (data.success) onLogin(); else setError(data.message);
    } catch (err) { setError("Erreur de connexion"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-10 shadow-2xl w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-primary-dark mb-2">BAOBAB <span className="text-accent">MIND & CAPITAL</span></h1>
          <p className="text-gray-500 font-medium">Espace Administrateur</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 font-medium border border-red-100 flex items-center gap-2"><Lock size={16} /> {error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Nom d'utilisateur" />
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Mot de passe" />
          <button type="submit" disabled={loading} className="w-full bg-primary-dark hover:bg-primary text-white font-bold py-4 rounded-xl mt-2 transition-all">
            {loading ? "Chargement..." : "Se connecter"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function TabAnalytics() {
  const [dateFilter, setDateFilter] = useState("Cette semaine");
  
  const mockData: Record<string, any> = {
    "Aujourd'hui": { 
      visitors: 124, whatsapp: 12, time: "2m 10s", 
      chart: [5, 10, 25, 15, 30, 8, 124], 
      geo: [{ c: "Burkina Faso", val: 70, col: "bg-green-500" }, { c: "Côte d'Ivoire", val: 30, col: "bg-orange-500" }, { c: "France", val: 14, col: "bg-blue-500" }, { c: "Autres", val: 10, col: "bg-gray-300" }] 
    },
    "Hier": { 
      visitors: 340, whatsapp: 28, time: "3m 05s", 
      chart: [20, 50, 40, 90, 60, 30, 50], 
      geo: [{ c: "Burkina Faso", val: 180, col: "bg-green-500" }, { c: "Côte d'Ivoire", val: 90, col: "bg-orange-500" }, { c: "Sénégal", val: 40, col: "bg-red-500" }, { c: "Autres", val: 30, col: "bg-gray-300" }] 
    },
    "Cette semaine": { 
      visitors: 2450, whatsapp: 142, time: "3m 45s", 
      chart: [400, 650, 450, 800, 550, 950, 750], 
      geo: [{ c: "Burkina Faso", val: 1400, col: "bg-green-500" }, { c: "Côte d'Ivoire", val: 500, col: "bg-orange-500" }, { c: "France", val: 300, col: "bg-blue-500" }, { c: "Autres", val: 250, col: "bg-gray-300" }] 
    },
    "Ce mois": { 
      visitors: 9800, whatsapp: 450, time: "4m 12s", 
      chart: [2000, 1500, 3000, 4000, 2500, 5000, 4500], 
      geo: [{ c: "Burkina Faso", val: 5500, col: "bg-green-500" }, { c: "Côte d'Ivoire", val: 2000, col: "bg-orange-500" }, { c: "France", val: 1200, col: "bg-blue-500" }, { c: "Autres", val: 1100, col: "bg-gray-300" }] 
    },
    "Tout le temps": { 
      visitors: 45200, whatsapp: 2100, time: "3m 50s", 
      chart: [5000, 8000, 6000, 12000, 9000, 15000, 12000], 
      geo: [{ c: "Burkina Faso", val: 25000, col: "bg-green-500" }, { c: "Côte d'Ivoire", val: 10000, col: "bg-orange-500" }, { c: "France", val: 5200, col: "bg-blue-500" }, { c: "Autres", val: 5000, col: "bg-gray-300" }] 
    }
  };

  const currentData = mockData[dateFilter] || mockData["Cette semaine"];
  const maxChartVal = Math.max(...currentData.chart);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Vue d'ensemble</h2>
          <p className="text-gray-500 mt-1">Suivez les performances de votre site web en temps réel.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {["Aujourd'hui", "Hier", "Cette semaine", "Ce mois", "Tout le temps", "Plage personnalisée"].map(filter => (
            <button
              key={filter}
              onClick={() => {
                if (filter === "Plage personnalisée") alert("Ouverture du calendrier...");
                else setDateFilter(filter);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                dateFilter === filter 
                  ? "bg-primary text-white border-primary shadow-md" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><Users size={24} /></div>
          <div><p className="text-gray-500 text-sm font-medium">Visiteurs Uniques</p><h3 className="text-2xl font-black text-gray-900 mt-1">{currentData.visitors.toLocaleString()}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={24} /></div>
          <div><p className="text-gray-500 text-sm font-medium">Clics WhatsApp</p><h3 className="text-2xl font-black text-gray-900 mt-1">{currentData.whatsapp.toLocaleString()}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600"><Calendar size={24} /></div>
          <div><p className="text-gray-500 text-sm font-medium">Temps moyen</p><h3 className="text-2xl font-black text-gray-900 mt-1">{currentData.time}</h3></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Évolution du trafic ({dateFilter})</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {currentData.chart.map((val: number, i: number) => {
              const heightPct = (val / maxChartVal) * 100;
              return (
                <div key={i} className="w-full flex flex-col items-center group relative h-full justify-end">
                  <div className="absolute -top-8 bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {val.toLocaleString()} visites
                  </div>
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${heightPct}%` }} 
                    transition={{ duration: 0.5 }} 
                    className="w-full bg-primary/20 group-hover:bg-primary rounded-t-xl transition-colors cursor-pointer" 
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10"><Map size={18}/> Origine ({dateFilter})</h3>
          <ul className="flex flex-col gap-6 relative z-10">
            {currentData.geo.map((item: any) => {
              const pct = (item.val / currentData.visitors) * 100;
              return (
                <li key={item.c}>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                    <span>{item.c}</span>
                    <span className="text-primary">{item.val.toLocaleString()} visiteurs</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} className={`h-full ${item.col}`} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function TabBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technologie");
  const [keywords, setKeywords] = useState("");
  
  const [mediaType, setMediaType] = useState<"image" | "youtube">("image");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // IA Assistant States
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [appliedBanner, setAppliedBanner] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        setPosts(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } finally { setIsUploading(false); }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const generateAIArticle = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);
    setAiResult(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAiGenerating(false);
    }
  };

  const applyAIResult = () => {
    if (!aiResult) return;
    setTitle(aiResult.title || "");
    setCategory(aiResult.category || "Technologie");
    setKeywords(aiResult.keywords || "");
    if (editorRef.current) {
      editorRef.current.innerHTML = aiResult.content || "";
    }
    setAppliedBanner("✓ Article transféré avec succès dans le formulaire ci-contre !");
    setTimeout(() => setAppliedBanner(null), 5000);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
    try {
      await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
      fetchPosts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const excerpt = editorRef.current?.innerHTML || "";
    if (!title.trim() || !excerpt.trim()) {
      alert("Veuillez renseigner le titre et le contenu de l'article.");
      return;
    }

    setIsSubmitting(true);
    const finalImageUrl = imageUrl || (videoUrl ? "" : "https://placehold.co/600x400/0F5C2E/FFF?text=Article");
    
    try {
      const res = await fetch("/api/posts", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          category, 
          keywords, 
          excerpt, 
          imageUrl: finalImageUrl, 
          videoUrl: mediaType === "youtube" ? videoUrl : "" 
        })
      });

      if (res.ok) {
        setTitle(""); setKeywords(""); setImageUrl(""); setVideoUrl("");
        if (editorRef.current) editorRef.current.innerHTML = "";
        setPublishSuccess("✓ Article publié avec succès sur le blog !");
        setTimeout(() => setPublishSuccess(null), 5000);
        fetchPosts();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const promptSuggestions = [
    { label: "⚡ Solaire & Solargroup", prompt: "Rédige un article sur l'essor de l'énergie solaire et des moteurs Solargroup en Afrique" },
    { label: "📈 Investissement 2026", prompt: "Opportunités du capital-investissement et valorisation des ressources stratégiques en Afrique" },
    { label: "🩺 MedTech & MLC", prompt: "Comment la télémédecine et le projet MLC révolutionnent la prévention santé en Afrique" },
    { label: "🤖 L'IA pour les PME", prompt: "L'impact de l'intelligence artificielle sur la croissance des entreprises africaines" }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Gestion du Blog & Assistant IA</h2>
          <p className="text-gray-500 mt-1">Rédigez, optimisez avec l'IA et publiez vos articles en quelques clics.</p>
        </div>
        <Link 
          href="/blog" 
          target="_blank" 
          className="inline-flex items-center gap-2 bg-white text-primary border border-primary/30 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-primary hover:text-white transition-all self-start"
        >
          <ExternalLink size={16} /> Voir le blog public
        </Link>
      </div>

      {appliedBanner && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-green-600 text-white p-4 rounded-2xl mb-6 shadow-lg font-bold flex items-center justify-between"
        >
          <span>{appliedBanner}</span>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Prêt à publier</span>
        </motion.div>
      )}

      {publishSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-primary text-white p-4 rounded-2xl mb-6 shadow-lg font-bold"
        >
          {publishSuccess}
        </motion.div>
      )}
      
      <div className="grid xl:grid-cols-3 gap-8 mb-12">
        
        {/* COLONNE GAUCHE: FORMULAIRE */}
        <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <PenTool size={20} className="text-accent" /> Éditeur d'article
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">Titre de l'article</label>
                <input 
                  type="text" 
                  required 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-gray-900 font-medium" 
                  placeholder="Ex: L'avenir de l'énergie en Afrique..." 
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none font-medium text-gray-900"
                >
                  {["Technologie", "Énergie", "Investissement", "Santé / MedTech", "Divers"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mots-clés SEO (Référencement Google)</label>
              <input 
                type="text" 
                value={keywords} 
                onChange={e => setKeywords(e.target.value)} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-gray-900" 
                placeholder="Ex: Investissement, Afrique, Solargroup, BAOBAB..." 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Média d'illustration</label>
              <div className="flex gap-4 mb-4">
                <button type="button" onClick={() => setMediaType("image")} className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mediaType === "image" ? "bg-primary text-white shadow" : "bg-gray-100 text-gray-600"}`}><ImageIcon size={16}/> Image</button>
                <button type="button" onClick={() => setMediaType("youtube")} className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mediaType === "youtube" ? "bg-red-600 text-white shadow" : "bg-gray-100 text-gray-600"}`}><Video size={16}/> Vidéo YouTube</button>
              </div>
              {mediaType === "image" ? (
                <div onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${imageUrl ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}>
                  <input type="file" ref={fileInputRef} onChange={e => e.target.files && uploadFile(e.target.files[0])} className="hidden" accept="image/*" />
                  {isUploading ? <span className="font-bold text-primary animate-pulse">Chargement de l'image...</span> : imageUrl ? <span className="font-bold text-green-700 flex items-center justify-center gap-2"><CheckCircle2 size={18}/> Image chargée avec succès !</span> : <span className="text-gray-500 font-medium">Cliquez ou glissez une image depuis votre appareil</span>}
                </div>
              ) : (
                <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none text-gray-900" placeholder="https://www.youtube.com/watch?v=..." />
              )}
            </div>

            <div className="flex flex-col flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">Contenu de l'article (Éditeur enrichi)</label>
              <div className="flex gap-2 p-2.5 bg-gray-100 rounded-t-xl border border-gray-200 border-b-0">
                <button type="button" onClick={() => formatText('bold')} className="p-2 hover:bg-gray-200 rounded text-gray-700 font-bold" title="Gras"><Bold size={16}/></button>
                <button type="button" onClick={() => formatText('italic')} className="p-2 hover:bg-gray-200 rounded text-gray-700 italic" title="Italique"><Italic size={16}/></button>
                <div className="w-px h-6 bg-gray-300 my-auto mx-1" />
                <button type="button" onClick={() => formatText('formatBlock', 'H3')} className="p-2 hover:bg-gray-200 rounded text-gray-700 font-bold text-xs">Titre H3</button>
                <button type="button" onClick={() => formatText('formatBlock', 'P')} className="p-2 hover:bg-gray-200 rounded text-gray-700 font-medium text-xs">Texte normal</button>
                <div className="w-px h-6 bg-gray-300 my-auto mx-1" />
                <button type="button" onClick={() => formatText('foreColor', '#0F5C2E')} className="p-2 hover:bg-gray-200 rounded text-primary font-bold text-xs" title="Vert Baobab">Vert</button>
              </div>
              <div 
                ref={editorRef}
                contentEditable
                className="w-full bg-white border border-gray-200 rounded-b-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none min-h-[220px] text-gray-800 leading-relaxed font-sans"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-primary-dark hover:bg-primary text-white font-extrabold py-4 rounded-xl mt-4 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Publication en cours..." : "Publier l'article sur le Blog"}
            </button>
          </form>
        </div>

        {/* COLONNE DROITE: ASSISTANT IA */}
        <div className="bg-gradient-to-b from-primary-dark via-[#0B4624] to-[#07381B] p-8 rounded-3xl border border-white/10 shadow-2xl text-white flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-accent/20 blur-3xl rounded-full" />
          
          <div className="flex items-center justify-between mb-2 relative z-10">
            <h3 className="text-xl font-bold flex items-center gap-2"><Sparkles className="text-accent" /> Assistant IA Rédacteur</h3>
            <span className="text-[11px] bg-accent/20 text-accent font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Ultra-Rapide</span>
          </div>
          <p className="text-sm text-gray-300 mb-6 relative z-10 leading-relaxed">
            Tapez un sujet ou cliquez une suggestion pour générer un article 100% optimisé en 1 seconde.
          </p>

          {/* Suggestions rapides en 1 clic pour les démos */}
          <div className="mb-4 relative z-10">
            <p className="text-xs text-accent font-bold mb-2 uppercase tracking-wide">💡 Idées d'articles en 1 clic :</p>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAiPrompt(s.prompt)}
                  className="text-xs bg-white/10 hover:bg-white/20 text-gray-200 px-3 py-1.5 rounded-lg border border-white/10 transition-colors text-left font-medium"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          
          <textarea 
            value={aiPrompt} 
            onChange={e => setAiPrompt(e.target.value)}
            placeholder="Ex : Analyse de la transition solaire en Afrique de l'Ouest..."
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent min-h-[110px] mb-4 relative z-10 text-sm leading-relaxed"
          />

          <button 
            type="button"
            onClick={generateAIArticle} 
            disabled={aiGenerating || !aiPrompt.trim()} 
            className="w-full bg-accent hover:bg-yellow-400 text-primary-dark font-black py-4 rounded-xl transition-all relative z-10 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
          >
            {aiGenerating ? (
              <>
                <span className="w-5 h-5 border-2 border-primary-dark border-t-transparent rounded-full animate-spin" />
                <span>Génération instantanée...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Générer l'article complet</span>
              </>
            )}
          </button>

          {aiResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl relative z-10 shadow-inner flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black bg-accent text-primary-dark px-2.5 py-0.5 rounded-full uppercase">
                  {aiResult.category || "Technologie"}
                </span>
                <span className="text-xs text-green-300 font-bold flex items-center gap-1">
                  <Check size={14} /> Prêt à intégrer
                </span>
              </div>
              <p className="font-extrabold text-base text-white leading-snug">{aiResult.title}</p>
              <p className="text-xs text-gray-300 line-clamp-1 italic">Mots-clés : {aiResult.keywords}</p>
              
              <button 
                type="button"
                onClick={applyAIResult} 
                className="w-full mt-2 bg-white text-primary-dark hover:bg-accent font-extrabold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>✨ Appliquer au formulaire</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* SECTION: ARTICLES PUBLIÉS */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
          <span>Articles actuellement publiés ({posts.length})</span>
          <button onClick={fetchPosts} className="text-xs text-primary font-bold hover:underline">Rafraîchir</button>
        </h3>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Aucun article publié pour le moment.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post: any) => (
              <div key={post.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative">
                    <img src={post.imageUrl || "https://placehold.co/100x100/0F5C2E/FFF"} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base group-hover:text-primary transition-colors">{post.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      <span className="font-semibold text-primary">{post.category}</span> · {new Date(post.createdAt).toLocaleDateString('fr-FR')} · {post.readTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end md:self-center">
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer l'article"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </motion.div>
  );
}

function TabSettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [aiEnabled, setAiEnabled] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    fetch("/api/auth").then(res => res.json()).then(data => {
      setNewUsername(data.username || "admin");
      if (data.aiEnabled !== undefined) setAiEnabled(data.aiEnabled);
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/auth", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_settings", password: oldPassword, newPassword, newUsername, aiEnabled })
      });
      const data = await res.json();
      if (data.success) {
        setMsg({ type: "success", text: "Paramètres mis à jour avec succès !" });
        setOldPassword(""); setNewPassword("");
      } else setMsg({ type: "error", text: data.message });
    } catch (err) { setMsg({ type: "error", text: "Erreur serveur" }); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Paramètres & IA</h2>
      
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm max-w-2xl">
        {msg.text && <div className={`p-4 rounded-xl mb-6 font-medium text-sm border ${msg.type === "error" ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-600 border-green-100"}`}>{msg.text}</div>}

        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Lock size={18} className="text-accent" /> Identifiants de connexion</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nom d'utilisateur</label>
                <input type="text" required value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nouveau mot de passe (optionnel)</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none" placeholder="Laissez vide pour conserver l'actuel" />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-100" />

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><Wand2 size={18} className="text-accent" /> Assistant IA Public (Support Client)</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={aiEnabled} onChange={e => setAiEnabled(e.target.checked)} className="w-5 h-5 accent-primary" />
              <span className="text-gray-700 font-medium">Activer l'assistant IA sur le site public pour répondre aux visiteurs</span>
            </label>
          </div>

          <div className="h-px w-full bg-gray-100" />
          
          <div>
            <label className="block text-sm font-bold text-red-600 mb-2">Confirmez votre mot de passe ACTUEL pour sauvegarder</label>
            <input type="password" required value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Mot de passe actuel obligatoire" />
          </div>

          <button type="submit" className="w-full sm:w-auto self-start bg-primary-dark hover:bg-primary text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md">
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </motion.div>
  );
}
