import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      // Simulation pour le développement
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return NextResponse.json({
        reply: "Bonjour ! Je suis l'assistant IA de BAOBAB MIND & CAPITAL. (Note: Clé API manquante pour des réponses réelles. Configurez OPENAI_API_KEY dans votre environnement)."
      });
    }

    const systemPrompt = `Tu es l'assistant IA officiel de BAOBAB MIND & CAPITAL. 
Ton rôle est de répondre aux questions des visiteurs concernant l'entreprise, ses projets (Solargroup, Reactor, Aureus Alliance, My Life Control) et la vision de son fondateur, Ousmane Zongo. 
Tu dois être professionnel, concis et courtois.
RÈGLE STRICTE : Si l'utilisateur pose une question qui n'a STRICTEMENT AUCUN RAPPORT avec BAOBAB MIND CAPITAL, l'investissement, ou les projets technologiques (ex: "Qui est le président du Burkina Faso ?", "Quelle est la météo ?"), tu DOIS refuser de répondre poliment en disant que ton rôle se limite à l'accompagnement sur les services de BAOBAB MIND & CAPITAL.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: systemPrompt }, ...messages]
      })
    });

    const data = await response.json();
    
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json({ error: "Erreur de communication avec l'assistant" }, { status: 500 });
  }
}
