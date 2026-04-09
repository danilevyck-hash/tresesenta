"use client";

import { Clock, DollarSign, CalendarCheck, BarChart3 } from "lucide-react";

const items = [
  {
    icon: Clock,
    titulo: "Más de una década de experiencia",
    descripcion:
      "12+ años gestionando proyectos de construcción en Panamá, con más de 50 proyectos completados exitosamente.",
  },
  {
    icon: DollarSign,
    titulo: "Control de presupuesto transparente",
    descripcion:
      "Reportes claros y detallados en cada etapa para que siempre sepa exactamente cómo se invierte cada dólar.",
  },
  {
    icon: CalendarCheck,
    titulo: "Entrega a tiempo garantizada",
    descripcion:
      "Cronogramas rigurosos y seguimiento constante para asegurar que su proyecto se entregue en el plazo acordado.",
  },
  {
    icon: BarChart3,
    titulo: "Tecnología y reportes en tiempo real",
    descripcion:
      "Herramientas modernas de gestión y reportes digitales que le permiten monitorear su proyecto desde cualquier lugar.",
  },
];

export default function PorQueNosotros() {
  return (
    <section className="py-24 px-4 bg-gray-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-dark">
            Diferenciadores
          </span>
          <h2 className="font-altivo text-3xl md:text-4xl text-brand-black mt-3 tracking-wide">
            Por Qu&eacute; Tresesenta
          </h2>
          <div className="w-12 h-[2px] bg-sand mx-auto mt-5" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.titulo}
                className="animate-on-scroll bg-white p-8 text-center group hover:shadow-lg transition-shadow"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-dark/10 rounded-full mb-5 group-hover:bg-teal-dark/20 transition-colors">
                  <Icon className="w-7 h-7 text-teal-dark" />
                </div>
                <h3 className="font-altivo text-lg text-brand-black tracking-wide mb-3 leading-tight">
                  {item.titulo}
                </h3>
                <p className="font-montserrat text-sm text-gray-600 leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
