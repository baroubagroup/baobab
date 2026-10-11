import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "Bonjour ! Comment puis-je vous renseigner sur BAOBAB MIND & CAPITAL ?" });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";
    const pLower = lastMessage.toLowerCase().trim();

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    const isRealOpenAiKey = Boolean(
      apiKey && 
      apiKey.startsWith("sk-") && 
      !apiKey.includes("ton_cle") && 
      apiKey.length > 25
    );

    // Si une vraie clé OpenAI est fournie
    if (isRealOpenAiKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const systemPrompt = `Tu es l'assistant IA officiel de BAOBAB MIND & CAPITAL, entreprise d'investissement et d'innovation technologique en Afrique dirigée par M. Ousmane Zongo (Bobo-Dioulasso / Ouagadougou, Burkina Faso).
Projets phares : Solargroup (moteurs et transition énergétique), Reactor / Golden Africa (industrie et ressources), Aureus Alliance (valorisation de l'or), My Life Control (santé connectée / MedTech).
Contact WhatsApp : +226 64 24 02 27 | Email : zousmane86@gmail.com.
RÈGLE STRICTE : Sois concis, courtois et professionnel. Si l'utilisateur pose une question hors-sujet sans aucun rapport avec l'entreprise ou l'investissement (météo, politique générale, sport, présidents...), refuse poliment en indiquant que ton rôle est exclusivement dédié à l'accompagnement sur les services de BAOBAB MIND & CAPITAL.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: systemPrompt }, ...messages.slice(-4)]
          })
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ reply: data.choices[0].message.content });
        }
      } catch (e) {
        console.warn("OpenAI API unreachable for chat, falling back to instant contextual bot:", e);
      }
    }

    // MOTEUR DE RÉPONSE INSTANTANÉ CONTEXTUEL (< 300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Filtrage strict des questions hors sujet
    const offTopicKeywords = ["président", "politique", "météo", "football", "match", "qui a gagné", "musique", "recette", "cuisine"];
    if (offTopicKeywords.some((k) => pLower.includes(k))) {
      return NextResponse.json({
        reply: "Je suis l'assistant dédié exclusivement à BAOBAB MIND & CAPITAL. Je ne peux pas répondre aux questions d'actualité générale ou de politique. Comment puis-je vous renseigner sur nos opportunités d'investissement et nos projets technologiques ?"
      });
    }

    // Réponses spécifiques aux projets et questions fréquentes
    if (pLower.includes("solargroup") || pLower.includes("solaire") || pLower.includes("moteur") || pLower.includes("duyunov")) {
      return NextResponse.json({
        reply: "Solargroup est l'un de nos projets phares dans l'efficacité énergétique et l'ingénierie industrielle. Il développe des moteurs asynchrones à haut rendement. Vous pouvez consulter notre page dédiée aux projets ou contacter M. Ousmane Zongo sur WhatsApp au +226 64 24 02 27 pour rejoindre le programme d'investissement."
      });
    }

    if (pLower.includes("reactor") || pLower.includes("golden") || pLower.includes("or") || pLower.includes("aureus")) {
      return NextResponse.json({
        reply: "Nos projets Golden Africa (Reactor) et Aureus Alliance sont axés sur la valorisation industrielle et financière des ressources stratégiques en Afrique. Ce sont des opportunités majeures de capital-investissement. Souhaitez-vous échanger directement avec notre équipe via WhatsApp ?"
      });
    }

    if (pLower.includes("mlc") || pLower.includes("santé") || pLower.includes("life control")) {
      return NextResponse.json({
        reply: "My Life Control (MLC) est notre pôle MedTech innovant, dédié aux technologies médicales connectées et à la prévention précoce des maladies. Un secteur à fort impact humain et financier."
      });
    }

    if (pLower.includes("qui est") || pLower.includes("zongo") || pLower.includes("fondateur") || pLower.includes("pdg")) {
      return NextResponse.json({
        reply: "BAOBAB MIND & CAPITAL est dirigée par M. Ousmane Zongo, entrepreneur visionnaire et investisseur engagé dans la souveraineté technologique et industrielle de l'Afrique."
      });
    }

    if (pLower.includes("contact") || pLower.includes("numéro") || pLower.includes("téléphone") || pLower.includes("whatsapp") || pLower.includes("email") || pLower.includes("adresse")) {
      return NextResponse.json({
        reply: "Vous pouvez nous joindre directement :\n• WhatsApp / Téléphone : +226 64 24 02 27\n• Email : zousmane86@gmail.com\n• Siège : Zone d'Activités Diverses (ZAD), Ouagadougou, Burkina Faso."
      });
    }

    // Réponse générale de bienvenue et d'accompagnement
    return NextResponse.json({
      reply: "Bonjour ! Bienvenue chez BAOBAB MIND & CAPITAL. Nous accompagnons les investisseurs et entrepreneurs dans 4 secteurs stratégiques : l'énergie (Solargroup), l'industrie (Reactor), la valorisation de l'or (Aureus Alliance) et la santé connectée (MLC). Comment puis-je vous guider ?"
    });

  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json({
      reply: "Je suis à votre écoute ! N'hésitez pas à contacter notre équipe au +226 64 24 02 27 pour toute information sur nos projets d'investissement."
    });
  }
}
