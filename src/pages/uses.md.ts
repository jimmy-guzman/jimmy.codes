import { readFile } from "node:fs/promises";
import type { APIRoute } from "astro";

import { toUsesMarkdown } from "@/utils/serializers";

export const GET: APIRoute = async () => {
  const source = await readFile("src/content/pages/uses.md", "utf8");

  return new Response(toUsesMarkdown(source), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
