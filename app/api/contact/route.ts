import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, mensaje, website } = body;

    // Honeypot anti-bot
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
    }

    const content = getContent();
    content.mensajes = content.mensajes || [];
    content.mensajes.push({
      nombre,
      email,
      telefono: telefono || "",
      mensaje,
      fecha: new Date().toISOString(),
      leido: false,
    });
    saveContent(content);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al enviar mensaje" }, { status: 500 });
  }
}
