import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-teal-dark mb-4">
        404
      </p>
      <h1 className="font-altivo text-4xl md:text-5xl text-brand-black tracking-wide mb-4">
        P&aacute;gina no encontrada
      </h1>
      <p className="font-montserrat text-gray-500 mb-8">
        La p&aacute;gina que busca no existe o fue movida.
      </p>
      <Link
        href="/"
        className="bg-sand text-brand-black font-montserrat font-semibold text-sm uppercase tracking-[0.15em] px-8 py-3 hover:bg-white transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
