"use client";

interface Cliente {
  nombre: string;
}

const clientes: Cliente[] = [
  { nombre: "Grupo Roble" },
  { nombre: "Empresas Bern" },
  { nombre: "Metro Holdings" },
  { nombre: "Constructora Urbana" },
  { nombre: "Inversiones del Istmo" },
  { nombre: "GrupoPPC" },
  { nombre: "Acero Panamá" },
  { nombre: "Desarrollo Pacífico" },
  { nombre: "Capital Tower" },
  { nombre: "Bahía Realty" },
];

export default function ClientesTicker() {
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

        <div className="flex animate-marquee">
          {[...clientes, ...clientes].map((c, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center px-10 md:px-14"
            >
              <span className="font-montserrat font-semibold text-lg md:text-xl text-brand-black/30 uppercase tracking-[0.15em] whitespace-nowrap select-none">
                {c.nombre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
