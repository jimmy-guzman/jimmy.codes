import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { toRawMarkdown } from "@/utils/serializers";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

export const GET: APIRoute = ({ props }) => {
  return new Response(toRawMarkdown(props.post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
