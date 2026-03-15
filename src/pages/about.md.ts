import { getEntry } from "astro:content";
import type { APIRoute } from "astro";

import { toRawPageMarkdown } from "@/utils/serializers";

export const GET: APIRoute = async () => {
  const page = await getEntry("pages", "about");

  if (!page) throw new Error("Missing content: pages/about.md");

  return new Response(toRawPageMarkdown(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
