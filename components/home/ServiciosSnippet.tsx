"use client";

import Link from "next/link";
import { Briefcase, Search, ClipboardList, CheckSquare } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  search: Search,
  clipboard: ClipboardList,
  checkSquare: CheckSquare,
};

const accentColors = [
  "bg-teal-dark",
  "bg-sand",
  "bg-teal-light",
  "bg-teal-dark",
];

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  items?: string[];
}

export default function ServiciosSnippet({ servicios }: { servicios: Servicio[] }) {
  return (
    <section className="py-28 px-4 bg-gray-bg relative overflow-hidden">
      {/* Mesh pattern - subtle */}
      <div className="absolute inset-0 mesh-pattern opacity-[0.08]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-dark mb-4">
            Nuestros Servicios
          </h2>
          <p className="font-altivo text-3xl md:text-4xl text-brand-black tracking-wide">
            Soluciones integrales para su proyecto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.slice(0, 4).map((s, i) => {
            const Icon = iconMap[s.icono] || Briefcase;
            return (
              <div
                key={s.id}
                className="bg-white hover:shadow-lg transition-all duration-300 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Color accent bar */}
                <div className={`h-1 ${accentColors[i]}`} />
                <div className="p-8">
                  <Icon className="w-10 h-10 text-teal-dark mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-altivo text-lg text-brand-black mb-3 tracking-wide">
                    {s.nombre}
                  </h3>
                  <p className="font-montserrat text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {s.descripcion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/servicios"
            className="inline-block bg-teal-dark text-white font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-brand-black transition-colors"
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </section>
  );
}
