import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/posts.json");

// Helper pour lire les articles
function getPosts() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const posts = getPosts();
    // Tri du plus récent au plus ancien
    posts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la lecture des articles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.title || !body.excerpt) {
      return NextResponse.json({ error: "Le titre et la description sont requis" }, { status: 400 });
    }

    const posts = getPosts();
    
    const newPost = {
      id: Date.now().toString(),
      title: body.title,
      category: body.category || "Actualités",
      excerpt: body.excerpt,
      keywords: body.keywords || "", // Support SEO
      imageUrl: body.imageUrl || "https://placehold.co/600x400/0F5C2E/FFF?text=Article", // Vert de marque
      videoUrl: body.videoUrl || null, // Support des vidéos YouTube
      createdAt: new Date().toISOString(),
      readTime: Math.max(2, Math.ceil((body.excerpt.length || 300) / 250)) + " min",
    };

    posts.unshift(newPost);
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'enregistrement de l'article" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID de l'article requis" }, { status: 400 });
    }

    const posts = getPosts();
    const filtered = posts.filter((p: any) => p.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2));

    return NextResponse.json({ success: true, message: "Article supprimé avec succès" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
