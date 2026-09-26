import { getCollection } from "astro:content";
import { readFile } from "node:fs/promises";
import type { APIRoute, InferGetStaticPropsType } from "astro";

export const getStaticPaths = async () => {
  const posts = await getCollection("posts");

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
};

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) => {
  const { filePath, id } = props.post;

  if (!filePath) throw new Error(`Missing source file for ${id}`);

  return new Response(await readFile(filePath, "utf8"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
