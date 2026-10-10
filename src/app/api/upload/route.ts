import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier n'a été fourni" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Définir le dossier de destination (public/uploads)
    const uploadDir = join(process.cwd(), "public/uploads");
    
    // Créer le dossier s'il n'existe pas
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignorer l'erreur si le dossier existe déjà
    }

    // Sécuriser le nom du fichier
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const filename = `${Date.now()}-${safeName}`;
    const filePath = join(uploadDir, filename);

    // Sauvegarder le fichier
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}`,
      message: "Fichier uploadé avec succès" 
    });

  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "L'upload a échoué" }, { status: 500 });
  }
}
