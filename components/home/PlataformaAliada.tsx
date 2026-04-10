export default function PlataformaAliada() {
  return (
    <section className="py-20 px-4 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 monogram-pattern opacity-[0.03]" />
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <h2 className="font-montserrat font-semibold text-xs uppercase tracking-[0.3em] text-sand mb-4">
          Plataforma Aliada
        </h2>
        <p className="font-altivo text-2xl md:text-3xl text-white tracking-wide mb-6">
          Tecnología al servicio de tu proyecto
        </p>
        <div className="w-12 h-[2px] bg-sand mx-auto mb-8" />
        <p className="font-montserrat text-white/70 leading-relaxed">
          Gestionamos tu proyecto con nuestra plataforma aliada{" "}
          <span className="text-sand font-semibold">Mawi</span> — presupuesto en
          tiempo real, órdenes de compra, firma digital, documentos y
          seguimiento, todo al alcance de un clic.
        </p>
      </div>
    </section>
  );
}
