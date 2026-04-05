"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/carrera", label: "Carrera" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const showDark = scrolled || mobileOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showDark
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" aria-label="TRESESENTA - Inicio">
            <Image
              src="/brand/LOGOS/Tresesenta-32.png"
              alt="TRESESENTA Project Management"
              width={176}
              height={44}
              className={`object-contain ${showDark ? "" : "brightness-0 invert"}`}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-montserrat font-semibold text-xs uppercase tracking-[0.15em] transition-colors ${
                  scrolled
                    ? "text-brand-black hover:text-teal-dark"
                    : "text-white hover:text-teal-light"
                } ${pathname === link.href ? "text-teal-dark" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 origin-center ${
                showDark ? "bg-brand-black" : "bg-white"
              } ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                showDark ? "bg-brand-black" : "bg-white"
              } ${mobileOpen ? "opacity-0 scale-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 origin-center ${
                showDark ? "bg-brand-black" : "bg-white"
              } ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[calc(100vh-5rem)] bg-white shadow-lg" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-montserrat font-semibold text-base uppercase tracking-[0.15em] transition-colors ${
                pathname === link.href ? "text-teal-dark" : "text-brand-black hover:text-teal-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
