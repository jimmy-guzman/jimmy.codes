import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import { toLlmsTxtMarkdown } from "@/utils/serializers";

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts");

  return new Response(toLlmsTxtMarkdown(posts), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
