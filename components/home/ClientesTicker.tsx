"use client";

import Image from "next/image";

interface Proyecto {
  id: string;
  promotor: string;
  logoCliente?: string;
}

export default function ClientesTicker({ proyectos }: { proyectos: Proyecto[] }) {
  const conLogo = proyectos.filter((p) => p.logoCliente);

  if (conLogo.length === 0) return null;

  // Duplicate for seamless loop
  const items = [...conLogo, ...conLogo];

  return (
    <section className="py-16 px-4 bg-gray-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 mb-10 text-center">
        <p className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-dark mb-3">
          Confían en nosotros
        </p>
        <div className="w-12 h-[2px] bg-sand mx-auto" />
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-bg to-transparent z-10 pointer-events-none" />

        <div className="flex items-center animate-marquee">
          {items.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-10 md:px-14"
            >
              <Image
                src={p.logoCliente!}
                alt={p.promotor}
                width={140}
                height={60}
                className="h-10 md:h-14 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
