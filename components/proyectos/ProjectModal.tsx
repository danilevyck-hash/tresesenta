"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % proyecto.imagenes.length);
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + proyecto.imagenes.length) % proyecto.imagenes.length
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-brand-black/80" />
      <div
        className="relative z-10 bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white hover:text-teal-light transition-colors bg-brand-black/50 p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image slider */}
        <div className="relative aspect-video">
          <img
            src={proyecto.imagenes[currentImage]}
            alt={proyecto.nombre}
            className="w-full h-full object-cover"
          />
          {proyecto.imagenes.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-brand-black/50 text-white p-2 hover:bg-teal-dark transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-black/50 text-white p-2 hover:bg-teal-dark transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {proyecto.imagenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentImage ? "bg-teal-light" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-8">
          <span className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-teal-dark">
            {proyecto.categoria}
          </span>
          <h2 className="font-altivo text-3xl text-brand-black mt-2 mb-6 tracking-wide">
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
        </div>
      </div>
    </div>
  );
}
