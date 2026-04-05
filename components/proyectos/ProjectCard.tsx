"use client";

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
    <div
      className="relative group cursor-pointer overflow-hidden aspect-[4/3] animate-on-scroll"
      onClick={onClick}
    >
      <img
        src={proyecto.imagenes[0]}
        alt={proyecto.nombre}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
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
    </div>
  );
}
