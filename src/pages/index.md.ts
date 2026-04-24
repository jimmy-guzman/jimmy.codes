import { getEntry } from "astro:content";
import type { APIRoute } from "astro";

import { toRawPageMarkdown } from "@/utils/serializers";

export const GET: APIRoute = async () => {
  const page = await getEntry("pages", "home");

  if (!page) return new Response("Not found", { status: 404 });

  return new Response(toRawPageMarkdown(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
