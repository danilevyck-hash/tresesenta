import type { Metadata } from "next";
import content from "@/data/content.json";
import ProyectosContent from "./ProyectosContent";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portafolio de proyectos de construcción gestionados por TRESESENTA en Panamá. Torres comerciales, residenciales, hoteles y megaproyectos.",
  openGraph: {
    title: "Proyectos | TRESESENTA",
    description:
      "Portafolio de proyectos de construcción gestionados en Panamá.",
  },
};

export default function ProyectosPage() {
  return <ProyectosContent proyectos={content.proyectos} />;
}
