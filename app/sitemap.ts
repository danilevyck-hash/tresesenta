import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tresesenta.com";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/proyectos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/carrera`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
