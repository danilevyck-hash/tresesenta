"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Metrica {
  valor: string;
  label: string;
}

function parseMetricValue(valor: string): { prefix: string; number: number; suffix: string } {
  // Extract the numeric part and any prefix/suffix
  // Examples: "+50" -> { prefix: "+", number: 50, suffix: "" }
  // "$500M+" -> { prefix: "$", number: 500, suffix: "M+" }
  // "+200K" -> { prefix: "+", number: 200, suffix: "K" }
  // "12" -> { prefix: "", number: 12, suffix: "" }
  const match = valor.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: valor };
  return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] };
}

function AnimatedMetric({ valor, label, isVisible }: { valor: string; label: string; isVisible: boolean }) {
  const { prefix, number, suffix } = parseMetricValue(valor);
  const [displayNumber, setDisplayNumber] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNumber(Math.round(eased * number));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [number]);

  useEffect(() => {
    if (isVisible) {
      animate();
    }
  }, [isVisible, animate]);

  return (
    <div className="text-center">
      <div className="font-din font-bold text-5xl md:text-6xl text-white mb-3">
        {prefix}{displayNumber}{suffix}
      </div>
      <div className="w-8 h-[2px] bg-sand mx-auto mb-3" />
      <div className="font-montserrat font-semibold text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </div>
    </div>
  );
}

export default function Metricas({ metricas }: { metricas: Metrica[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-4 bg-teal-dark relative overflow-hidden">
      {/* Monogram pattern overlay */}
      <div className="absolute inset-0 monogram-pattern opacity-[0.06]" />
      {/* Mesh pattern accent */}
      <div className="absolute bottom-0 left-0 w-full h-32 mesh-pattern opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metricas.map((m, i) => (
            <AnimatedMetric key={i} valor={m.valor} label={m.label} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
