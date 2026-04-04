import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
      <body className={`${montserrat.variable} font-montserrat antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
