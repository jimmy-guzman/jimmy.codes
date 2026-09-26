import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import OgImage from "@/components/og-image";

const toDataUrl = (type: string, buffer: Buffer) => {
  return `data:${type};base64,${buffer.toString("base64")}`;
};

const FONT_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.0/files/jetbrains-mono-latin-400-normal.woff";

let fontData: Promise<ArrayBuffer> | undefined;

const loadFont = () => {
  fontData ??= fetch(FONT_URL).then((res) => {
    if (!res.ok) throw new Error(`OG font fetch failed: ${res.status}`);

    return res.arrayBuffer();
  });

  return fontData;
};

const favicon = fs
  .readFile(path.join(process.cwd(), "public/favicon.svg"))
  .then((buffer) => toDataUrl("image/svg+xml", buffer));

export async function getStaticPaths() {
  const posts = await getCollection("posts");

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
}

export const GET: APIRoute = async ({ params, props }) => {
  const coverImage = await fs
    .readFile(
      path.join(process.cwd(), "src/assets/images/posts", `${params.slug}.png`),
    )
    .then((buffer) => toDataUrl("image/png", buffer))
    .catch(() => undefined);

  return new ImageResponse(
    OgImage({ coverImage, logo: await favicon, title: props.title }),
    {
      fonts: [
        {
          data: await loadFont(),
          name: "JetBrains Mono",
          style: "normal",
          weight: 400,
        },
      ],
      height: 630,
      width: 1200,
    },
  );
};
