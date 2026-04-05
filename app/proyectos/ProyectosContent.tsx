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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {selected && (
        <ProjectModal proyecto={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
