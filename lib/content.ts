import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

export function getContent() {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

export function saveContent(data: Record<string, unknown>) {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}
