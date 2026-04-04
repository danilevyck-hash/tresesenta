"use client";

import Image from "next/image";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <Image
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920"
        alt="Proyecto de construcción"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brand-black/60" />

      {/* Dot pattern overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 dot-pattern opacity-10 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <div className="flex justify-center mb-8">
          <Logo color="white" size="large" />
        </div>
        <p className="font-montserrat text-white text-lg md:text-2xl tracking-wider max-w-2xl mx-auto mb-10 font-light">
          Administración e Inspección de Proyectos de Construcción
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#contacto"
            className="inline-block bg-teal-dark text-white font-montserrat font-bold text-sm uppercase tracking-[0.2em] px-10 py-4 hover:bg-teal-light hover:text-brand-black transition-colors"
          >
            Contáctenos
          </Link>
          <Link
            href="/proyectos"
            className="inline-block border-2 border-white/40 text-white font-montserrat font-bold text-sm uppercase tracking-[0.2em] px-10 py-4 hover:border-white hover:bg-white/10 transition-colors"
          >
            Ver Proyectos
          </Link>
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
