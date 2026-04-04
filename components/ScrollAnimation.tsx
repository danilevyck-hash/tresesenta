"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function ScrollAnimation({ children }: { children: React.ReactNode }) {
  useScrollAnimation();
  return <>{children}</>;
}
