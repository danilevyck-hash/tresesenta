import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    fs.mkdirSync(uploadDir, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/${folder}/${fileName}`,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
