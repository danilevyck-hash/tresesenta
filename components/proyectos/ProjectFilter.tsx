"use client";

const CATEGORIES = ["Todos", "Comercial", "Residencial", "Deportivo", "Institucional"];

export default function ProjectFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`font-montserrat font-semibold text-xs uppercase tracking-[0.15em] px-4 md:px-6 py-2.5 transition-colors focus-visible:ring-2 focus-visible:ring-teal-dark focus-visible:ring-offset-2 ${
            active === cat
              ? "bg-brand-black text-white"
              : "bg-transparent text-gray-400 hover:text-brand-black border border-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
