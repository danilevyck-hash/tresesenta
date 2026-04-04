import type { Metadata } from "next";
import content from "@/data/content.json";
import ScrollAnimation from "@/components/ScrollAnimation";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a TRESESENTA: nuestra misión, visión, valores y el equipo de profesionales detrás de cada proyecto de construcción en Panamá.",
  openGraph: {
    title: "Nosotros | TRESESENTA",
    description:
      "Conoce a TRESESENTA: nuestra misión, visión, valores y el equipo detrás de cada proyecto.",
  },
};

export default function NosotrosPage() {
  return (
    <ScrollAnimation>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920"
          alt="Equipo de construcción trabajando"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-montserrat font-bold text-xs uppercase tracking-[0.3em] text-teal-light mb-4">
            Nosotros
          </h1>
          <p className="font-montserrat text-4xl md:text-5xl text-white font-semibold">
            Quiénes Somos
          </p>
        </div>
      </section>

      {/* About text */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <p className="font-montserrat text-xl md:text-2xl text-brand-black leading-relaxed font-light">
            {content.general.quienesSomos}
          </p>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="py-24 px-4 bg-gray-bg relative overflow-hidden">
        <div className="absolute inset-0 mesh-pattern" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 animate-on-scroll">
              <div className="w-12 h-1 bg-teal-dark mb-6" />
              <h3 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-teal-dark mb-4">
                Misión
              </h3>
              <p className="text-gray-600 leading-relaxed">{content.general.mision}</p>
            </div>
            <div className="bg-white p-8 animate-on-scroll" style={{ transitionDelay: "100ms" }}>
              <div className="w-12 h-1 bg-sand mb-6" />
              <h3 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-teal-dark mb-4">
                Visión
              </h3>
              <p className="text-gray-600 leading-relaxed">{content.general.vision}</p>
            </div>
            <div className="bg-white p-8 animate-on-scroll" style={{ transitionDelay: "200ms" }}>
              <div className="w-12 h-1 bg-teal-light mb-6" />
              <h3 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-teal-dark mb-4">
                Valores
              </h3>
              <ul className="space-y-2">
                {content.general.valores.map((v: string, i: number) => (
                  <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                    <span className="text-teal-dark mt-1">•</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="font-montserrat font-bold text-xs uppercase tracking-[0.3em] text-teal-dark mb-4">
              Nuestro Equipo
            </h2>
            <p className="font-montserrat text-3xl md:text-4xl text-brand-black font-semibold">
              Profesionales comprometidos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {content.equipo.map((member, i: number) => (
              <div
                key={member.id}
                className="text-center animate-on-scroll"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full">
                  <Image
                    src={member.foto}
                    alt={member.nombre}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    sizes="192px"
                  />
                </div>
                <h3 className="font-montserrat font-semibold text-lg text-brand-black">
                  {member.nombre}
                </h3>
                <p className="font-montserrat text-sm text-gray-500 mt-1">{member.cargo}</p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-teal-dark hover:text-teal-light transition-colors"
                    aria-label={`LinkedIn de ${member.nombre}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
}
