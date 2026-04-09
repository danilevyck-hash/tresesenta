"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import ProjectFilter from "@/components/proyectos/ProjectFilter";
import ProjectCard from "@/components/proyectos/ProjectCard";
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

export default function ProyectosContent({ proyectos }: { proyectos: Proyecto[] }) {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Proyecto | null>(null);
  useScrollAnimation();

  const filtered =
    filter === "Todos"
      ? proyectos
      : proyectos.filter((p) => p.categoria === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920"
          alt="Vista aérea de proyecto de construcción"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-black/70" />
        <div className="absolute inset-0 monogram-pattern opacity-[0.03]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-sand mb-4">
            Portafolio
          </h1>
          <p className="font-altivo text-4xl md:text-5xl text-white tracking-wide">
            Nuestros Proyectos
          </p>
          <div className="w-12 h-[2px] bg-sand mx-auto mt-6" />
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <ProjectFilter active={filter} onChange={setFilter} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                proyecto={p}
                onClick={() => setSelected(p)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              No hay proyectos en esta categoría.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-brand-black text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-altivo text-3xl md:text-4xl text-white tracking-wide mb-4">
            &iquest;Tiene un proyecto en mente?
          </h2>
          <p className="font-montserrat text-white/70 mb-8">
            Conversemos sobre c&oacute;mo podemos ayudarle a hacerlo realidad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#contacto"
              className="inline-block bg-sand text-brand-black font-montserrat font-semibold text-sm uppercase tracking-[0.2em] px-10 py-4 hover:bg-white transition-colors"
            >
              Cont&aacute;ctenos
            </a>
            <a
              href="https://wa.me/5073960360"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-[#20bd5a] transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {selected && (
        <ProjectModal proyecto={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
