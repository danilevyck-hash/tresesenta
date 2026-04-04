import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;
    const posicion = formData.get("posicion") as string;
    const file = formData.get("cv") as File | null;

    if (!nombre || !email || !posicion) {
      return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
    }

    let cvUrl = "";
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads", "cv");
      fs.mkdirSync(uploadDir, { recursive: true });
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const fileName = `${Date.now()}-${safeName}`;
      fs.writeFileSync(path.join(uploadDir, fileName), buffer);
      cvUrl = `/uploads/cv/${fileName}`;
    }

    const content = getContent();
    content.aplicaciones = content.aplicaciones || [];
    content.aplicaciones.push({
      nombre,
      email,
      posicion,
      cv: cvUrl,
      fecha: new Date().toISOString(),
    });
    saveContent(content);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al enviar aplicación" }, { status: 500 });
  }
}
