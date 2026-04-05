"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Posicion {
  id: string;
  titulo: string;
  descripcion: string;
  requisitos: string[];
  activo: boolean;
}

export default function CarreraContent({ carrera }: { carrera: Posicion[] }) {
  const [form, setForm] = useState({ nombre: "", email: "", posicion: "", cv: null as File | null });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  useScrollAnimation();

  const activePositions = carrera.filter((c) => c.activo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const fd = new FormData();
      fd.append("nombre", form.nombre);
      fd.append("email", form.email);
      fd.append("posicion", form.posicion);
      if (form.cv) fd.append("cv", form.cv);

      const res = await fetch("/api/apply", { method: "POST", body: fd });
      if (!res.ok) throw new Error();

      setStatus("sent");
      setForm({ nombre: "", email: "", posicion: "", cv: null });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920"
          alt="Equipo de construcción en obra"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-black/70" />
        <div className="absolute inset-0 monogram-pattern opacity-[0.03]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-sand mb-4">
            Carrera
          </h1>
          <p className="font-altivo text-4xl md:text-5xl text-white tracking-wide">
            Únete a Nuestro Equipo
          </p>
          <div className="w-12 h-[2px] bg-sand mx-auto mt-6" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <p className="font-montserrat text-xl text-brand-black leading-relaxed font-light">
            En TRESESENTA buscamos profesionales apasionados por la construcción y la excelencia.
            Si quieres ser parte de un equipo que transforma el paisaje urbano, explora nuestras
            posiciones abiertas.
          </p>
        </div>
      </section>

      {/* Open positions */}
      {activePositions.length > 0 && (
        <section className="py-16 px-4 bg-gray-bg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-montserrat font-bold text-xs uppercase tracking-[0.3em] text-teal-dark mb-8 text-center animate-on-scroll">
              Posiciones Abiertas
            </h2>
            <div className="space-y-6">
              {activePositions.map((pos, i) => (
                <div
                  key={pos.id}
                  className="bg-white p-8 animate-on-scroll hover:shadow-lg transition-shadow duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <h3 className="font-altivo text-xl text-brand-black mb-3 tracking-wide">
                    {pos.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4">{pos.descripcion}</p>
                  <div className="font-montserrat font-bold text-xs uppercase tracking-[0.15em] text-gray-400 mb-2">
                    Requisitos
                  </div>
                  <ul className="space-y-1">
                    {pos.requisitos.map((r, j) => (
                      <li key={j} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-teal-dark mt-0.5">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Application form */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="font-montserrat font-bold text-xs uppercase tracking-[0.3em] text-teal-dark mb-4">
              Aplica Ahora
            </h2>
            <p className="font-altivo text-3xl text-brand-black tracking-wide">
              Envía tu aplicación
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-on-scroll">
            <div>
              <label className="font-montserrat font-bold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">Nombre completo</label>
              <input
                type="text"
                placeholder="Tu nombre"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors"
              />
            </div>
            <div>
              <label className="font-montserrat font-bold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">Email</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors"
              />
            </div>
            <div>
              <label className="font-montserrat font-bold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">Posición</label>
              <select
                required
                value={form.posicion}
                onChange={(e) => setForm({ ...form, posicion: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors text-gray-600"
              >
                <option value="">Selecciona una posición</option>
                {activePositions.map((pos) => (
                  <option key={pos.id} value={pos.titulo}>
                    {pos.titulo}
                  </option>
                ))}
                <option value="Aplicación espontánea">Aplicación espontánea</option>
              </select>
            </div>
            <div>
              <label className="font-montserrat font-bold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">CV (máx. 10MB)</label>
              <div className="border border-gray-300 px-4 py-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 10 * 1024 * 1024) {
                      alert("El archivo no puede superar 10MB");
                      e.target.value = "";
                      return;
                    }
                    setForm({ ...form, cv: file || null });
                  }}
                  className="font-montserrat text-sm"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-teal-dark text-white font-montserrat font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-teal-light hover:text-brand-black transition-colors disabled:opacity-50"
              >
                {status === "sending" ? "Enviando..." : "Enviar aplicación"}
              </button>
            </div>
            {status === "sent" && (
              <p className="text-center text-teal-dark text-sm">
                ¡Aplicación enviada exitosamente!
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sand text-sm">
                Error al enviar. Intente nuevamente.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
