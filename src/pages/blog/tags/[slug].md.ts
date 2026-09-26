import { getCollection } from "astro:content";
import type { APIRoute, InferGetStaticPropsType } from "astro";

import { toTagMarkdown } from "@/utils/serializers";
import { getAllTags, slugifyTag } from "@/utils/tags";

export const getStaticPaths = async () => {
  const posts = await getCollection("posts");

  return getAllTags(posts).map(({ tag }) => ({
    params: { slug: slugifyTag(tag) },
    props: { posts, tag },
  }));
};

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props }) => {
  return new Response(toTagMarkdown(props.tag, props.posts), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
