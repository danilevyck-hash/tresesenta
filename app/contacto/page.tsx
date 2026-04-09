import type { Metadata } from "next";
import content from "@/data/content.json";
import ScrollAnimation from "@/components/ScrollAnimation";
import ContactFormClient from "./ContactFormClient";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctenos para su próximo proyecto de construcción en Panamá. Administración e inspección de proyectos: residencial, comercial, hotelería e industrial.",
  openGraph: {
    title: "Contacto | TRESESENTA",
    description:
      "Contáctenos para su próximo proyecto de construcción en Panamá.",
  },
};

export default function ContactoPage() {
  return (
    <ScrollAnimation>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920"
          alt="Proyecto en construcción"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-black/70" />
        <div className="absolute inset-0 monogram-pattern opacity-[0.03]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-sand mb-4">
            Contacto
          </h1>
          <p className="font-altivo text-4xl md:text-5xl text-white tracking-wide">
            Hablemos de su proyecto
          </p>
          <div className="w-12 h-[2px] bg-sand mx-auto mt-6" />
        </div>
      </section>

      {/* Contact section */}
      <section className="py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form - 2 cols */}
            <div className="lg:col-span-2 animate-on-scroll">
              <h2 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-dark mb-4">
                Escríbanos
              </h2>
              <p className="font-altivo text-2xl md:text-3xl text-brand-black tracking-wide mb-8">
                ¿Tiene un proyecto en mente?
              </p>
              <ContactFormClient />
            </div>

            {/* Sidebar */}
            <div className="animate-on-scroll" style={{ transitionDelay: "150ms" }}>
              <h2 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-dark mb-8">
                Información de contacto
              </h2>

              <div className="space-y-8">
                {/* Phone */}
                <div>
                  <h3 className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-brand-black mb-2">
                    Teléfono
                  </h3>
                  <a
                    href={`tel:${content.general.telefono.replace(/\s/g, "")}`}
                    className="font-montserrat text-gray-500 hover:text-teal-dark transition-colors"
                  >
                    {content.general.telefono}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <h3 className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-brand-black mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${content.general.email}`}
                    className="font-montserrat text-gray-500 hover:text-teal-dark transition-colors"
                  >
                    {content.general.email}
                  </a>
                </div>

                {/* WhatsApp */}
                <div>
                  <h3 className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-brand-black mb-2">
                    WhatsApp
                  </h3>
                  <a
                    href={`https://wa.me/${content.general.telefono.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-montserrat text-gray-500 hover:text-teal-dark transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Enviar mensaje
                  </a>
                </div>

                {/* Address */}
                <div>
                  <h3 className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-brand-black mb-2">
                    Dirección
                  </h3>
                  <p className="font-montserrat text-gray-500">
                    {content.general.direccion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="animate-on-scroll">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126916.49498464729!2d-79.58707467421874!3d9.025438400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca8f1dbe80363%3A0xaba25df1f042c10e!2sPanama%20City%2C%20Panama!5e0!3m2!1ses!2sus!4v1700000000000!5m2!1ses!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de TRESESENTA en Ciudad de Panamá"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </section>
    </ScrollAnimation>
  );
}
