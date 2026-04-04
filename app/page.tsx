import content from "@/data/content.json";
import ScrollAnimation from "@/components/ScrollAnimation";
import Hero from "@/components/home/Hero";
import QuienesSomos from "@/components/home/QuienesSomos";
import ServiciosSnippet from "@/components/home/ServiciosSnippet";
import ProyectosGrid from "@/components/home/ProyectosGrid";
import Metricas from "@/components/home/Metricas";
import ContactForm from "@/components/home/ContactForm";

export default function HomePage() {
  return (
    <ScrollAnimation>
      <Hero />
      <QuienesSomos texto={content.general.quienesSomos} />
      <ServiciosSnippet servicios={content.servicios} />
      <ProyectosGrid proyectos={content.proyectos} />
      <Metricas metricas={content.metricas} />
      <ContactForm />
    </ScrollAnimation>
  );
}
