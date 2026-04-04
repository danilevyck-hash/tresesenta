"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-bg px-4">
      <div className="bg-white p-10 w-full max-w-md shadow-sm">
        <div className="flex justify-center mb-8">
          <Logo color="dark" />
        </div>
        <h1 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-center text-gray-400 mb-8">
          Panel de Administración
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-teal-dark transition-colors"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-teal-dark text-white font-montserrat font-bold text-sm uppercase tracking-[0.15em] py-3 hover:bg-teal-light hover:text-brand-black transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
