import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PolitiqueConfidentialite() {
  return (
    <div className="bg-light-gray min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium text-sm mb-8">
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-10">Politique de Confidentialité</h1>
          
          <div className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">1. Collecte des données personnelles</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Dans le cadre de l'utilisation du site de BAOBAB MIND & CAPITAL, nous ne collectons aucune donnée personnelle à votre insu. Les seules données qui peuvent être collectées sont celles que vous nous communiquez volontairement en nous contactant directement par email ou via l'application WhatsApp.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">2. Utilisation des données</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Les informations que vous nous transmettez sont exclusivement utilisées pour :<br />
              - Répondre à vos demandes de renseignements ou d'accompagnement.<br />
              - Gérer la relation client et le suivi de vos projets.<br />
              - Vous fournir les informations relatives aux opportunités présentées sur le site.<br /><br />
              Vos données ne sont ni vendues, ni louées, ni cédées à des tiers à des fins commerciales.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">3. Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              La navigation sur le site de BAOBAB MIND & CAPITAL est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Ces cookies techniques ont pour finalité de faciliter la navigation ultérieure sur le site et permettent de mesurer la fréquentation de manière anonyme. Vous pouvez paramétrer votre navigateur pour refuser ces cookies.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">4. Vos droits</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Conformément à la réglementation sur la protection des données personnelles, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant.<br /><br />
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <strong>zousmane86@gmail.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
