// src/pages/og.png.tsx
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import { Og } from "../components/og";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "jimmy.codes";
  const theme = (searchParams.get("theme") ?? "light").toLowerCase();

  let fonts: { name: string; data: ArrayBuffer; style: "normal" }[] = [];
  try {
    const fontData = await fetch(
      new URL("../assets/Satoshi-Variable.woff2", import.meta.url),
    ).then((r) => r.arrayBuffer());
    fonts = [{ name: "Satoshi", data: fontData, style: "normal" as const }];
  } catch {}

  return new ImageResponse(Og({ theme, title }), {
    width: 1200,
    height: 630,
    fonts,
  });
};
