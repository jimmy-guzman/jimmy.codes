import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

import { toBlogIndexMarkdown } from "@/utils/serializers";

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts");

  return new Response(toBlogIndexMarkdown(posts), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
