"use client";

import Link from "next/link";
import { Briefcase, Search, ClipboardList, Shield, FileText, ShoppingCart } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  search: Search,
  clipboard: ClipboardList,
  shield: Shield,
  fileText: FileText,
  shoppingCart: ShoppingCart,
};

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
}

export default function ServiciosSnippet({ servicios }: { servicios: Servicio[] }) {
  return (
    <section className="py-24 px-4 bg-gray-bg relative overflow-hidden">
      {/* Mesh pattern */}
      <div className="absolute inset-0 mesh-pattern" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-xs uppercase tracking-[0.3em] text-teal-dark mb-4">
            Nuestros Servicios
          </h2>
          <p className="font-montserrat text-3xl md:text-4xl text-brand-black font-semibold">
            Soluciones integrales para su proyecto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.slice(0, 6).map((s, i) => {
            const Icon = iconMap[s.icono] || Briefcase;
            return (
              <div
                key={s.id}
                className="bg-white p-8 hover:shadow-lg transition-shadow group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Icon className="w-10 h-10 text-teal-dark mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-montserrat font-semibold text-lg text-brand-black mb-2">
                  {s.nombre}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {s.descripcion}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/servicios"
            className="inline-block bg-teal-dark text-white font-montserrat font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-teal-light hover:text-brand-black transition-colors"
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </section>
  );
}
