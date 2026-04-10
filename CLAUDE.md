# Tresesenta — Landing Page

Website de TRESESENTA, firma de administración e inspección de proyectos de construcción en Panamá.

## Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS
- **Database:** Ninguna (contenido estático en data/content.json)
- **Hosting:** Vercel (pendiente conectar)

## Páginas
| Página | Ruta | Descripción |
|--------|------|-------------|
| Home | `/` | Hero, quiénes somos, servicios, proyectos, métricas, contacto |
| Nosotros | `/nosotros` | Misión, visión, valores, equipo |
| Servicios | `/servicios` | Lista expandible con iconos |
| Proyectos | `/proyectos` | Grid filtrable con modal de detalle |
| Carrera | `/carrera` | Posiciones abiertas + formulario de aplicación |
| Admin | `/admin` | Editor de contenido (protegido con PIN) |

## Contenido
- Todo el contenido viene de `data/content.json` — importado directamente, sin API fetch
- Todas las páginas son Server Components estáticos (○ Static en build)
- Admin puede editar contenido via /admin (modifica el JSON)

## SEO
- Meta tags completos: OG title/description/image, Twitter cards
- keywords, locale es_PA, metadataBase
- robots.txt: permite todo excepto /admin/ y /api/
- sitemap.xml con todas las rutas públicas
- Per-page metadata (title template "%s | TRESESENTA")

## Design System
- Colores: brand-black (#0A0A0A), teal-dark (#2C6E63), teal-light (#5CB8A8), sand (#C9B99A), cream (#F5F0EB)
- Fuentes: Montserrat (headings, uppercase tracking) + Cormorant Garamond (serif decorativo)
- Scroll animations con IntersectionObserver (animate-on-scroll)
- Mobile: hamburger con body scroll lock, close on navigate
- Focus-visible styles para accesibilidad keyboard
- next/image para optimización de imágenes

## APIs públicas (sin auth)
- POST /api/contact — formulario de contacto (guarda en content.json)
- POST /api/apply — formulario de carrera con upload de CV

## Deploy
```bash
git remote add origin https://github.com/danilevyck-hash/tresesenta.git
git push -u origin main
```


## Regla de Calidad
- Todo código debe funcionar a la primera. No pushear sin verificar el flujo completo end-to-end.
- Verificar: datos fluyen escritura → DB → lectura → UI
- Auth en serverless: usar tokens HMAC firmados, NO Maps en memoria
- No hacer fire-and-forget (.then().catch()) para operaciones críticas — siempre await
- useState en useEffect como dependencia puede causar re-renders destructivos — usar useRef para estado interno
- Verificar compatibilidad de formatos antes de integrar (PNG/JPEG en jsPDF, DER/P1363 en WebAuthn)
- Si no puedo probar en browser, simular el flujo con script
