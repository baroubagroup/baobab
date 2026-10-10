import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MentionsLegales() {
  return (
    <div className="bg-light-gray min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium text-sm mb-8">
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-10">Mentions Légales</h1>
          
          <div className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">1. Éditeur du site</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Le présent site web est édité par <strong>BAROUBA INTERNATIONAL GROUP SARL</strong>.<br />
              <strong>Siège social :</strong> Bobo-Dioulasso, Burkina Faso.<br />
              <strong>Email :</strong> baroubagroup@gmail.com<br /><br />
              <strong>Propriétaire du site / Directeur de la publication :</strong> M. Ousmane Zongo.<br />
              <strong>Téléphone :</strong> +226 64 24 02 27<br />
              <strong>Email :</strong> zousmane86@gmail.com
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">2. Hébergement</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              L'hébergement de ce site est assuré par la société Vercel Inc.<br />
              <strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">3. Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              L'ensemble du contenu (textes, images, vidéos, graphismes, logos, icônes, etc.) présent sur ce site est protégé par le droit d'auteur et la propriété intellectuelle. Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit est interdite, sauf autorisation écrite préalable de BAOBAB MIND & CAPITAL.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">4. Responsabilité</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              BAOBAB MIND & CAPITAL s'efforce de fournir sur son site des informations aussi précises que possible. Toutefois, l'entreprise ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.<br /><br />
              Le site mentionne également des projets d'investissements (Solargroup, Reactor, Aureus, MLC). Les investissements comportent des risques. Les informations fournies le sont à titre indicatif et ne constituent en aucun cas des conseils financiers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
