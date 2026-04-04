"use client";

const CATEGORIES = ["Todos", "Comercial", "Residencial", "Hotelería", "Institucional", "Megaproyecto"];

export default function ProjectFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`font-montserrat font-bold text-xs uppercase tracking-[0.15em] px-6 py-2 transition-colors ${
            active === cat
              ? "bg-teal-dark text-white"
              : "bg-gray-bg text-brand-black hover:bg-teal-light/30"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
