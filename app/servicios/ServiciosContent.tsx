"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import {
  Briefcase,
  Search,
  ClipboardList,
  Shield,
  FileText,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

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

export default function ServiciosContent({ servicios }: { servicios: Servicio[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  useScrollAnimation();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920"
          alt="Proyecto de construcción en progreso"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-light mb-4">
            Servicios
          </h1>
          <p className="font-altivo text-4xl md:text-5xl text-white tracking-wide">
            Nuestros Servicios
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          {servicios.map((s, i) => {
            const Icon = iconMap[s.icono] || Briefcase;
            const isExpanded = expanded === s.id;

            return (
              <div
                key={s.id}
                className="animate-on-scroll border-b border-gray-200 last:border-0"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : s.id)}
                  className="w-full py-8 flex items-center gap-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-dark focus-visible:ring-offset-2 rounded"
                  aria-expanded={isExpanded}
                >
                  <Icon className="w-10 h-10 text-teal-dark flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <h3 className="font-altivo text-xl text-brand-black group-hover:text-teal-dark transition-colors tracking-wide">
                      {s.nombre}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? "max-h-96 pb-8" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed pl-16">{s.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
