import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/data/admin.json");

export async function POST(request: Request) {
  try {
    const { action, username, password, newPassword, newUsername, aiEnabled } = await request.json();
    
    // Lire la base de données
    const dbData = fs.readFileSync(DB_PATH, "utf-8");
    const adminData = JSON.parse(dbData);

    // ACTION: LOGIN
    if (action === "login") {
      if (username === adminData.username && password === adminData.password) {
        return NextResponse.json({ success: true, message: "Connexion réussie" });
      } else {
        return NextResponse.json({ success: false, message: "Identifiants incorrects" }, { status: 401 });
      }
    }
    
    // ACTION: UPDATE SETTINGS
    if (action === "update_settings") {
      // Vérifier le mot de passe actuel
      if (password === adminData.password) {
        if (newPassword) adminData.password = newPassword;
        if (newUsername) adminData.username = newUsername;
        if (aiEnabled !== undefined) adminData.aiEnabled = aiEnabled;
        
        fs.writeFileSync(DB_PATH, JSON.stringify(adminData, null, 2));
        return NextResponse.json({ success: true, message: "Paramètres mis à jour avec succès" });
      } else {
        return NextResponse.json({ success: false, message: "Le mot de passe actuel est incorrect" }, { status: 401 });
      }
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400 });

  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dbData = fs.readFileSync(DB_PATH, "utf-8");
    const adminData = JSON.parse(dbData);
    // Ne renvoyer que les données non sensibles pour l'affichage
    return NextResponse.json({ username: adminData.username, aiEnabled: adminData.aiEnabled });
  } catch (error) {
    return NextResponse.json({ error: "Erreur de lecture" }, { status: 500 });
  }
}
