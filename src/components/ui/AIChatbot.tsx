"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Bonjour ! Je suis l'assistant virtuel de BAOBAB MIND & CAPITAL. Comment puis-je vous aider aujourd'hui concernant nos projets ou nos offres d'investissement ?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Ne pas afficher sur la page admin
  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    // Vérifier si l'IA est activée dans les paramètres
    fetch("/api/auth").then(res => res.json()).then(data => {
      if (data.aiEnabled) setIsEnabled(true);
    });
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isEnabled) return null;

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages.slice(-5), userMsg] }) // Envoyer le contexte récent
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: "assistant", content: data.reply || "Désolé, je ne peux pas répondre pour le moment." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Erreur de connexion. Veuillez réessayer." }]);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-dark p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Bot className="text-accent" size={20} />
                <div>
                  <h3 className="font-bold text-sm">Assistant BAOBAB</h3>
                  <p className="text-[10px] text-accent flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse"/> En ligne</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`max-w-[85%] rounded-xl p-3 text-sm ${msg.role === "assistant" ? "bg-white border border-gray-100 text-gray-700 self-start shadow-sm" : "bg-primary text-white self-end shadow-md"}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white border border-gray-100 text-gray-500 self-start shadow-sm rounded-xl p-3 max-w-[85%] flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"/>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}/>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}/>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="submit" disabled={!input.trim() || isLoading} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 hover:bg-primary-dark transition-colors disabled:opacity-50">
                <Send size={16} className="-ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 md:right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center shadow-2xl z-50 border-2 border-accent/20"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </motion.button>
    </>
  );
}

