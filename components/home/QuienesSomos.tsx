"use client";

import Link from "next/link";
import Image from "next/image";

interface Props {
  texto: string;
}

export default function QuienesSomos({ texto }: Props) {
  return (
    <section className="py-28 px-4 relative overflow-hidden">
      {/* Monogram pattern - subtle background */}
      <div className="absolute inset-0 monogram-pattern opacity-[0.03]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* TL logotype accent */}
        <div className="flex justify-center mb-8">
          <Image
            src="/brand/LOGOS/Tresesenta-33.png"
            alt=""
            width={48}
            height={48}
            className="object-contain opacity-15"
            aria-hidden="true"
          />
        </div>

        <h2 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-dark mb-8">
          Quiénes Somos
        </h2>
        <p className="font-altivo text-2xl md:text-3xl text-brand-black leading-relaxed tracking-wide">
          {texto}
        </p>

        {/* Sand divider */}
        <div className="w-12 h-[2px] bg-sand mx-auto mt-10 mb-10" />

        <Link
          href="/nosotros"
          className="inline-block border-2 border-brand-black text-brand-black font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-8 py-3 hover:bg-brand-black hover:text-white transition-colors"
        >
          Conoce más
        </Link>
      </div>
    </section>
  );
}
