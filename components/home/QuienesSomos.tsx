"use client";

import Link from "next/link";

interface Props {
  texto: string;
}

export default function QuienesSomos({ texto }: Props) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-montserrat font-bold text-xs uppercase tracking-[0.3em] text-teal-dark mb-6">
          Quiénes Somos
        </h2>
        <p className="font-montserrat text-2xl md:text-3xl text-brand-black leading-relaxed font-light">
          {texto}
        </p>
        <Link
          href="/nosotros"
          className="inline-block mt-10 border-2 border-teal-dark text-teal-dark font-montserrat font-bold text-sm uppercase tracking-[0.15em] px-8 py-3 hover:bg-teal-dark hover:text-white transition-colors"
        >
          Conoce más
        </Link>
      </div>
    </section>
  );
}
