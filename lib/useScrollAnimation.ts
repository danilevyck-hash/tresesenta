"use client";

import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    // Fallback: force all elements visible after 500ms
    const timeout = setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll:not(.visible)").forEach((el) => {
        el.classList.add("visible");
      });
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);
}
