import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const data = getContent();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error reading content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    saveContent(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error saving content" }, { status: 500 });
  }
}
