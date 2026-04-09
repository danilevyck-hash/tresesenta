"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-altivo text-4xl md:text-5xl text-brand-black tracking-wide mb-4">
        Algo sali&oacute; mal
      </h1>
      <p className="font-montserrat text-gray-500 mb-8">
        Ocurri&oacute; un error inesperado. Por favor intente nuevamente.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-teal-dark text-white font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-8 py-3 hover:bg-teal-light hover:text-brand-black transition-colors"
        >
          Reintentar
        </button>
        <a
          href="/"
          className="bg-sand text-brand-black font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-8 py-3 hover:bg-white transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
