"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectModal from "@/components/proyectos/ProjectModal";

interface Proyecto {
  id: string;
  nombre: string;
  categoria: string;
  ubicacion: string;
  periodo: string;
  promotor: string;
  inversion: string;
  area: string;
  descripcion: string;
  servicios: string[];
  imagenes: string[];
}

export default function ProyectosGrid({ proyectos }: { proyectos: Proyecto[] }) {
  const [selected, setSelected] = useState<Proyecto | null>(null);

  return (
    <section className="py-28 px-4 relative overflow-hidden">
      {/* Monogram pattern accent */}
      <div className="absolute top-0 right-0 w-80 h-80 monogram-pattern opacity-[0.03]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-dark mb-4">
            Proyectos Destacados
          </h2>
          <p className="font-altivo text-3xl md:text-4xl text-brand-black tracking-wide">
            Obras que hablan por nosotros
          </p>
          <div className="w-12 h-[2px] bg-sand mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {proyectos.slice(0, 4).map((p, i) => (
            <div
              key={p.id}
              className="relative group cursor-pointer overflow-hidden aspect-[4/3]"
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setSelected(p)}
            >
              <Image
                src={p.imagenes[0]}
                alt={p.nombre}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-teal-dark/0 group-hover:bg-teal-dark/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <span className="font-montserrat font-semibold text-xs uppercase tracking-[0.2em] text-teal-light">
                  {p.categoria}
                </span>
                <h3 className="font-altivo text-xl text-white mt-1 tracking-wide">
                  {p.nombre}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="/proyectos"
            className="inline-block border-2 border-brand-black text-brand-black font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-brand-black hover:text-white transition-colors"
          >
            Ver todos los proyectos
          </a>
        </div>
      </div>

      {selected && (
        <ProjectModal proyecto={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
