"use client";

import Image from "next/image";

interface Proyecto {
  id: string;
  nombre: string;
  categoria: string;
  imagenes: string[];
}

export default function ProjectCard({
  proyecto,
  onClick,
}: {
  proyecto: Proyecto;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="relative group cursor-pointer overflow-hidden aspect-[4/3] w-full text-left animate-on-scroll focus-visible:ring-2 focus-visible:ring-teal-dark focus-visible:ring-offset-2"
      onClick={onClick}
    >
      <Image
        src={proyecto.imagenes[0]}
        alt={proyecto.nombre}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-teal-dark/0 group-hover:bg-teal-dark/60 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <span className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-teal-light">
          {proyecto.categoria}
        </span>
        <h3 className="font-altivo text-xl text-white mt-1 tracking-wide">
          {proyecto.nombre}
        </h3>
      </div>
    </button>
  );
}
