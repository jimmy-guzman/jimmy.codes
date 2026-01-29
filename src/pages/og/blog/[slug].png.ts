import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import OgImage from "@/components/og-image";

let fontCache: ArrayBuffer | null = null;
let faviconCache: string | null = null;

async function getFontData() {
  if (!fontCache) {
    fontCache = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.0/files/jetbrains-mono-latin-400-normal.woff",
    ).then((res) => res.arrayBuffer());
  }

  // biome-ignore lint/style/noNonNullAssertion: Justified null check above
  return fontCache!;
}

async function getFaviconBase64() {
  if (!faviconCache) {
    const faviconPath = path.join(process.cwd(), "public/favicon.svg");
    const faviconBuffer = await fs.readFile(faviconPath, "utf-8");
    faviconCache = `data:image/svg+xml;base64,${Buffer.from(faviconBuffer).toString("base64")}`;
  }

  // biome-ignore lint/style/noNonNullAssertion: Justified null check above
  return faviconCache!;
}

export async function getStaticPaths() {
  const posts = await getCollection("posts");

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { title: post.data.title },
  }));
}

export const GET: APIRoute = async ({ params, props }) => {
  const { slug } = params;
  const { title } = props;

  const faviconBase64 = await getFaviconBase64();

  try {
    const imagePath = path.join(
      process.cwd(),
      "src/assets/images",
      `${slug}.png`,
    );
    const imageBuffer = await fs.readFile(imagePath);
    const coverImageBase64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    return new ImageResponse(
      OgImage({ coverImage: coverImageBase64, logo: faviconBase64, title }),
      {
        fonts: [
          {
            data: await getFontData(),
            name: "JetBrains Mono",
            style: "normal",
            weight: 400,
          },
        ],
        height: 630,
        width: 1200,
      },
    );
  } catch {
    return new ImageResponse(OgImage({ logo: faviconBase64, title }), {
      height: 630,
      width: 1200,
    });
  }
};
