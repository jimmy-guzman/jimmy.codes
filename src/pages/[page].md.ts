import { readFile } from "node:fs/promises";
import type { APIRoute, InferGetStaticPropsType } from "astro";

export const getStaticPaths = () => {
  return [
    { params: { page: "index" }, props: { id: "home" } },
    { params: { page: "about" }, props: { id: "about" } },
  ];
};

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) => {
  const source = await readFile(`src/content/pages/${props.id}.md`, "utf8");

  return new Response(source, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
