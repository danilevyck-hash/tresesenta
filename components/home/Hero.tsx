"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920"
        alt="Proyecto de construcción"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brand-black/65" />

      {/* Monogram pattern overlay - top left */}
      <div className="absolute top-0 left-0 w-96 h-96 monogram-pattern opacity-[0.04] z-10" />
      {/* Dot pattern - bottom right */}
      <div className="absolute bottom-0 right-0 w-72 h-72 dot-pattern opacity-[0.06] z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/brand/LOGOS/Tresesenta-32.png"
            alt="TRESESENTA Project Management"
            width={420}
            height={90}
            className="brightness-0 invert object-contain"
            priority
          />
        </div>

        {/* Divider line */}
        <div className="w-16 h-[2px] bg-sand mx-auto mb-8" />

        <h1 className="sr-only">
          Gerencia e Inspección de Proyectos de Construcción en Panamá — TRESESENTA
        </h1>

        <p className="font-montserrat text-white/80 text-base md:text-lg tracking-[0.15em] max-w-xl mx-auto mb-12 leading-relaxed">
          Administración e inspección integral de proyectos de construcción en Panamá
        </p>

        <Link
          href="/#contacto"
          className="inline-block bg-sand text-brand-black font-montserrat font-semibold text-sm uppercase tracking-[0.2em] px-12 py-4 hover:bg-white transition-colors"
        >
          Contáctenos
        </Link>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sand"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
