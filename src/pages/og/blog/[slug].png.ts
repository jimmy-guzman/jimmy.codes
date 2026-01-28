import { fontData, getFontBuffer } from "astro:assets";
import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import OgImage from "@/components/og-image";

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

  const imagePath = path.join(
    process.cwd(),
    "src/assets/images",
    `${slug}.png`,
  );

  const faviconPath = path.join(process.cwd(), "public/favicon.svg");
  const faviconBuffer = await fs.readFile(faviconPath, "utf-8");
  const faviconBase64 = `data:image/svg+xml;base64,${Buffer.from(faviconBuffer).toString("base64")}`;

  try {
    const data = fontData["--font-og"];
    const imageBuffer = await fs.readFile(imagePath);
    const coverImageBase64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    return new ImageResponse(
      OgImage({ coverImage: coverImageBase64, logo: faviconBase64, title }),
      {
        fonts: [
          {
            data: await getFontBuffer(data[0].src[0].url),
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
