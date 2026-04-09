"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Proyecto {
  id: string;
  nombre: string;
  categoria: string;
  ubicacion: string;
  periodo: string;
  promotor: string;
  inversion: string;
  area: string;
  descripcion: string;
  servicios: string[];
  imagenes: string[];
}

export default function ProjectModal({
  proyecto,
  onClose,
}: {
  proyecto: Proyecto;
  onClose: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  const nextImage = useCallback(
    () => setCurrentImage((prev) => (prev + 1) % proyecto.imagenes.length),
    [proyecto.imagenes.length]
  );
  const prevImage = useCallback(
    () => setCurrentImage((prev) => (prev - 1 + proyecto.imagenes.length) % proyecto.imagenes.length),
    [proyecto.imagenes.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleClose, nextImage, prevImage]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay ${closing ? "modal-closing" : ""}`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-brand-black/80" />
      <div
        className="relative z-10 bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Cerrar modal"
          className="absolute top-3 right-3 z-20 text-white hover:text-teal-light transition-colors bg-brand-black/50 p-3"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image slider */}
        <div className="relative aspect-video">
          <Image
            src={proyecto.imagenes[currentImage]}
            alt={`${proyecto.nombre} — imagen ${currentImage + 1} de ${proyecto.imagenes.length}`}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
          {proyecto.imagenes.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-brand-black/50 text-white p-3 hover:bg-teal-dark transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Imagen siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-black/50 text-white p-3 hover:bg-teal-dark transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {proyecto.imagenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    aria-label={`Imagen ${i + 1}`}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === currentImage ? "bg-teal-light" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-5 md:p-8">
          <span className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-teal-dark">
            {proyecto.categoria}
          </span>
          <h2 className="font-altivo text-2xl md:text-3xl text-brand-black mt-2 mb-6 tracking-wide">
            {proyecto.nombre}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">{proyecto.descripcion}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Ubicación", value: proyecto.ubicacion },
              { label: "Periodo", value: proyecto.periodo },
              { label: "Promotor", value: proyecto.promotor },
              { label: "Inversión", value: proyecto.inversion },
              { label: "Área", value: proyecto.area },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-montserrat font-bold text-xs uppercase tracking-[0.15em] text-gray-400 mb-1">
                  {item.label}
                </div>
                <div className="font-montserrat text-sm text-brand-black font-medium">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="font-montserrat font-bold text-xs uppercase tracking-[0.15em] text-gray-400 mb-2">
              Servicios Prestados
            </div>
            <div className="flex flex-wrap gap-2">
              {proyecto.servicios.map((s) => (
                <span
                  key={s}
                  className="bg-gray-bg text-brand-black font-montserrat text-xs px-3 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-montserrat text-sm text-gray-600">
              &iquest;Interesado en un proyecto similar?
            </p>
            <a
              href="/#contacto"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="inline-block bg-teal-dark text-white font-montserrat font-semibold text-xs uppercase tracking-[0.2em] px-8 py-3 hover:bg-teal-light transition-colors"
            >
              Cont&aacute;ctenos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
