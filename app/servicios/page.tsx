import type { Metadata } from "next";
import content from "@/data/content.json";
import ServiciosContent from "./ServiciosContent";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Gerencia de proyectos, inspección técnica, preconstrucción, control de calidad, administración de contratos y gestión de compras en Panamá.",
  openGraph: {
    title: "Servicios | TRESESENTA",
    description:
      "Soluciones integrales para su proyecto de construcción en Panamá.",
  },
};

export default function ServiciosPage() {
  return <ServiciosContent servicios={content.servicios} />;
}
