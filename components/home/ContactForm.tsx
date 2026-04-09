"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "", website: "" });
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
      setForm({ nombre: "", email: "", telefono: "", mensaje: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="py-28 px-4 relative overflow-hidden">
      {/* Background image - different from hero */}
      <Image
        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920"
        alt="Proyecto en construcción"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brand-black/88" />
      {/* Mesh pattern accent */}
      <div className="absolute inset-0 mesh-pattern opacity-[0.04]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-sand mb-4">
            Contacto
          </h2>
          <p className="font-altivo text-3xl md:text-4xl text-white tracking-wide">
            ¿Tiene un proyecto en mente?
          </p>
          <div className="w-12 h-[2px] bg-sand mx-auto mt-6 mb-4" />
          <p className="font-montserrat text-white/50 text-sm">
            Escríbanos y le responderemos a la brevedad.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot anti-bot */}
          <input name="website" className="hidden" tabIndex={-1} autoComplete="off" value={form.website ?? ""} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Nombre</label>
              <input
                type="text"
                placeholder="Su nombre"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-sand transition-colors"
              />
            </div>
            <div>
              <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Email</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-sand transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Teléfono</label>
            <input
              type="tel"
              placeholder="+507 000-0000"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-sand transition-colors"
            />
          </div>
          <div>
            <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Mensaje</label>
            <textarea
              placeholder="Cuéntenos sobre su proyecto..."
              required
              rows={5}
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              className="w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-sand transition-colors resize-none"
            />
          </div>
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-sand text-brand-black font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-12 py-4 hover:bg-white transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
          {status === "sent" && (
            <p className="text-center text-sand font-montserrat text-sm">
              ¡Mensaje enviado! Nos pondremos en contacto pronto.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sand font-montserrat text-sm">
              Error al enviar. Intente nuevamente.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
