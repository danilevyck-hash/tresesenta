"use client";

interface Metrica {
  valor: string;
  label: string;
}

export default function Metricas({ metricas }: { metricas: Metrica[] }) {
  return (
    <section className="py-28 px-4 bg-teal-dark relative overflow-hidden">
      {/* Monogram pattern overlay */}
      <div className="absolute inset-0 monogram-pattern opacity-[0.06]" />
      {/* Mesh pattern accent */}
      <div className="absolute bottom-0 left-0 w-full h-32 mesh-pattern opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metricas.map((m, i) => (
            <div key={i} className="text-center">
              <div className="font-din font-bold text-5xl md:text-6xl text-white mb-3">
                {m.valor}
              </div>
              <div className="w-8 h-[2px] bg-sand mx-auto mb-3" />
              <div className="font-montserrat font-semibold text-xs uppercase tracking-[0.2em] text-white/60">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
