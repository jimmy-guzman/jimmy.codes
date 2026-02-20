import { getCollection } from "astro:content";
import type { APIRoute, InferGetStaticPropsType } from "astro";

import { toRawMarkdown } from "@/utils/serializers";

export const getStaticPaths = async () => {
  const posts = await getCollection("posts");

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
};

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props }) => {
  return new Response(toRawMarkdown(props.post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
