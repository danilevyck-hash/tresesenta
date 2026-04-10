"use client";

import { useState } from "react";

export default function ContactFormClient() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", tipoProyecto: "", mensaje: "", website: "" });
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
      setForm({ nombre: "", email: "", telefono: "", tipoProyecto: "", mensaje: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot anti-bot */}
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" value={form.website ?? ""} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">Nombre</label>
          <input
            type="text"
            placeholder="Su nombre"
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full bg-gray-bg border border-gray-200 text-brand-black placeholder-gray-400 px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors"
          />
        </div>
        <div>
          <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">Email</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-gray-bg border border-gray-200 text-brand-black placeholder-gray-400 px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">Teléfono</label>
        <input
          type="tel"
          placeholder="+507 000-0000"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="w-full bg-gray-bg border border-gray-200 text-brand-black placeholder-gray-400 px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors"
        />
      </div>
      <div>
        <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">Tipo de proyecto</label>
        <select
          value={form.tipoProyecto}
          onChange={(e) => setForm({ ...form, tipoProyecto: e.target.value })}
          className="w-full bg-gray-bg border border-gray-200 text-brand-black px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors appearance-none"
        >
          <option value="">Seleccione un tipo</option>
          <option value="Residencial">Residencial</option>
          <option value="Comercial">Comercial</option>
          <option value="Deportivo">Deportivo</option>
          <option value="Institucional">Institucional</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div>
        <label className="font-montserrat font-semibold text-xs uppercase tracking-[0.15em] text-gray-400 block mb-2">Mensaje</label>
        <textarea
          placeholder="Cuéntenos sobre su proyecto..."
          required
          rows={5}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          className="w-full bg-gray-bg border border-gray-200 text-brand-black placeholder-gray-400 px-5 py-4 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors resize-none"
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-teal-dark text-white font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-12 py-4 hover:bg-brand-black transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
      {status === "sent" && (
        <p className="text-teal-dark font-montserrat text-sm">
          ¡Mensaje enviado! Nos pondremos en contacto pronto.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 font-montserrat text-sm">
          Error al enviar. Intente nuevamente.
        </p>
      )}
    </form>
  );
}
