import type { Metadata } from "next";
import content from "@/data/content.json";
import CarreraContent from "./CarreraContent";

export const metadata: Metadata = {
  title: "Carrera",
  description:
    "Únete al equipo de TRESESENTA. Posiciones abiertas para ingenieros civiles y coordinadores de proyectos en Panamá.",
  openGraph: {
    title: "Carrera | TRESESENTA",
    description:
      "Posiciones abiertas para profesionales de la construcción en Panamá.",
  },
};

export default function CarreraPage() {
  return <CarreraContent carrera={content.carrera} />;
}
