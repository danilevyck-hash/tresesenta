import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const altivo = localFont({
  src: "../public/fonts/Altivo.otf",
  variable: "--font-altivo",
  display: "swap",
});

const montserrat = localFont({
  src: [
    {
      path: "../public/fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const dinCondensed = localFont({
  src: "../public/fonts/DINCondensed.ttf",
  variable: "--font-din",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tresesenta.com"),
  title: {
    default: "TRESESENTA | Administración e Inspección de Proyectos de Construcción",
    template: "%s | TRESESENTA",
  },
  description:
    "Firma panameña de administración e inspección de proyectos de construcción. Gerencia de proyectos, inspección técnica, preconstrucción y control de calidad en Ciudad de Panamá.",
  keywords: [
    "administración de proyectos",
    "inspección de construcción",
    "gerencia de proyectos",
    "Panamá",
    "construcción",
    "control de calidad",
    "preconstrucción",
  ],
  authors: [{ name: "TRESESENTA" }],
  openGraph: {
    title: "TRESESENTA | Administración e Inspección de Proyectos de Construcción",
    description:
      "Firma panameña de administración e inspección de proyectos de construcción. +50 proyectos completados, $500M+ en inversión gestionada.",
    url: "https://tresesenta.com",
    siteName: "TRESESENTA",
    locale: "es_PA",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "TRESESENTA — Administración e Inspección de Proyectos de Construcción",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRESESENTA | Administración e Inspección de Proyectos",
    description:
      "Firma panameña de administración e inspección de proyectos de construcción.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=630&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              name: "TRESESENTA",
              description:
                "Firma panameña de administración e inspección de proyectos de construcción. Gerencia de proyectos, inspección técnica, preconstrucción y control de calidad.",
              url: "https://tresesenta.com",
              telephone: "+507 396-0360",
              email: "info@tresesenta.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ciudad de Panamá",
                addressCountry: "PA",
              },
              sameAs: [
                "https://instagram.com/tresesenta",
                "https://linkedin.com/company/tresesenta",
                "https://facebook.com/tresesenta",
              ],
            }),
          }}
        />
      </head>
      <body className={`${altivo.variable} ${montserrat.variable} ${dinCondensed.variable} font-montserrat antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
