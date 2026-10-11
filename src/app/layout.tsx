import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AIChatbot from "@/components/ui/AIChatbot";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  metadataBase: new URL('https://baobab-mind-capital.com'),
  title: "BAOBAB Mind & Capital — Innovation, Technologie, Investissement en Afrique",
  description: "Accompagnement des entrepreneurs et investisseurs africains dans les projets technologiques d'avenir : énergie, industrie, santé, finance.",
  keywords: ["investissement", "afrique", "technologie", "innovation", "Ousmane Zongo", "Baobab Mind Capital", "Solargroup", "Startups africaines", "Fonds d'investissement", "Capital risque"],
  authors: [{ name: "Ousmane Zongo" }],
  creator: "BAOBAB MIND & CAPITAL",
  publisher: "BAOBAB MIND & CAPITAL",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: "BAOBAB Mind & Capital — Innovation & Investissement",
    description: "Façonnons ensemble les écosystèmes technologiques du futur en Afrique. Découvrez nos opportunités d'investissement exclusives.",
    url: "https://baobab-mind-capital.com",
    siteName: "BAOBAB MIND & CAPITAL",
    images: [{ url: "/images/pdg.webp", width: 1200, height: 630, alt: "BAOBAB Mind & Capital" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAOBAB Mind & Capital",
    description: "Investissement technologique en Afrique. Projets : Solargroup, Reactor, Aureus Alliance, MLC.",
    images: ["/images/pdg.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground pb-16 md:pb-0">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <AIChatbot />
        <WhatsAppButton />
        <MobileBottomNav />
      </body>
    </html>
  );
}
