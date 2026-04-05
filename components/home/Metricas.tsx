"use client";

interface Metrica {
  valor: string;
  label: string;
}

export default function Metricas({ metricas }: { metricas: Metrica[] }) {
  return (
    <section className="py-24 px-4 bg-brand-black relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute top-4 left-4 w-32 h-32 dot-pattern opacity-20" />
      <div className="absolute bottom-4 right-4 w-32 h-32 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metricas.map((m, i) => (
            <div key={i} className="text-center">
              <div className="font-din font-bold text-4xl md:text-5xl text-teal-light mb-2">
                {m.valor}
              </div>
              <div className="font-montserrat font-semibold text-xs uppercase tracking-[0.2em] text-gray-400">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
