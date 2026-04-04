"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setStatus("sent");
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="py-24 px-4 relative"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920)",
        }}
      />
      <div className="absolute inset-0 bg-brand-black/85" />
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-xs uppercase tracking-[0.3em] text-teal-light mb-4">
            Contacto
          </h2>
          <p className="font-montserrat text-3xl md:text-4xl text-white font-semibold">
            ¿Tiene un proyecto en mente?
          </p>
          <p className="font-montserrat text-gray-400 mt-3 text-sm">
            Escríbanos y le responderemos a la brevedad.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nombre"
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-teal-light focus:ring-1 focus:ring-teal-light transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-teal-light focus:ring-1 focus:ring-teal-light transition-colors"
            />
          </div>
          <input
            type="tel"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-teal-light focus:ring-1 focus:ring-teal-light transition-colors"
          />
          <textarea
            placeholder="Mensaje"
            required
            rows={5}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-teal-light focus:ring-1 focus:ring-teal-light transition-colors resize-none"
          />
          <div className="text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-teal-dark text-white font-montserrat font-bold text-sm uppercase tracking-[0.15em] px-10 py-4 hover:bg-teal-light hover:text-brand-black transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
          {status === "sent" && (
            <p className="text-center text-teal-light text-sm">
              ¡Mensaje enviado! Nos pondremos en contacto pronto.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-red-400 text-sm">
              Error al enviar. Intente nuevamente.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
