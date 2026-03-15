import type { APIRoute } from "astro";

import { toUsesMarkdown } from "@/utils/serializers";

export const GET: APIRoute = () => {
  return new Response(toUsesMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
