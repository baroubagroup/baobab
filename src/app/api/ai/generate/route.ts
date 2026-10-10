import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      // Simulation pour le développement si la clé n'est pas définie
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return NextResponse.json({
        title: "Comment l'IA révolutionne les investissements en Afrique",
        category: "Technologie",
        keywords: "IA, investissement, Afrique, technologie, croissance, BAOBAB MIND CAPITAL",
        content: "<p>L'intelligence artificielle n'est plus une simple promesse, c'est une <strong>réalité tangible</strong> qui transforme le paysage de l'investissement en Afrique.</p><br/><p>Chez <span style='color: #1E6C93; font-weight: bold;'>BAOBAB MIND & CAPITAL</span>, nous intégrons ces nouvelles technologies pour déceler les meilleures opportunités du marché.</p>"
      });
    }

    // Appel réel à l'API OpenAI si la clé est présente
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { 
            role: "system", 
            content: "Tu es un expert SEO et rédacteur web pour BAOBAB MIND & CAPITAL. Ton objectif est d'écrire un article de blog complet. Retourne UNIQUEMENT un objet JSON avec les propriétés suivantes: title (string), category (string parmi Technologie, Énergie, Investissement, Santé / MedTech, Divers), keywords (string séparé par des virgules), et content (string avec du code HTML formaté: <b>, <i>, <span style='color:...'>)." 
          },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération IA" }, { status: 500 });
  }
}
