"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & tagline */}
          <div className="md:col-span-2">
            <Image
              src="/brand/LOGOS/Tresesenta-36.png"
              alt="3/60 Project Management"
              width={80}
              height={100}
              className="brightness-0 invert object-contain"
            />
            <p className="mt-4 text-gray-400 font-montserrat text-sm max-w-md">
              Firma de administración e inspección de proyectos de construcción.
              Garantizamos calidad, eficiencia y cumplimiento en cada obra.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-xs uppercase tracking-[0.2em] text-teal-light mb-4">
              Navegación
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/nosotros", label: "Nosotros" },
                { href: "/servicios", label: "Servicios" },
                { href: "/proyectos", label: "Proyectos" },
                { href: "/carrera", label: "Carrera" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white font-montserrat text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold text-xs uppercase tracking-[0.2em] text-teal-light mb-4">
              Contacto
            </h4>
            <div className="flex flex-col gap-2 text-gray-400 font-montserrat text-sm">
              <a href="tel:+5073960360" className="hover:text-white transition-colors">
                +507 396-0360
              </a>
              <a href="mailto:info@tresesenta.com" className="hover:text-white transition-colors">
                info@tresesenta.com
              </a>
              <p>Ciudad de Panamá, Panamá</p>
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com/tresesenta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-light transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/tresesenta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-light transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 font-montserrat text-xs">
          <p>© {new Date().getFullYear()} TRESESENTA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
