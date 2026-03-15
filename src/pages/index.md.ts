import { getEntry } from "astro:content";
import type { APIRoute } from "astro";

import { toRawPageMarkdown } from "@/utils/serializers";

export const GET: APIRoute = async () => {
  const page = await getEntry("pages", "home");

  if (!page) throw new Error("Missing content: pages/home.md");

  return new Response(toRawPageMarkdown(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
