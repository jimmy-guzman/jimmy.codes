import type { APIRoute } from "astro";

const AI_ROBOTS_TXT_URL =
  "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt";

async function fetchAiBots() {
  try {
    const response = await fetch(AI_ROBOTS_TXT_URL);

    if (!response.ok) return [];

    const text = await response.text();
    const bots = text
      .split("\n")
      .filter((line) => line.startsWith("User-agent:"))
      .map((line) => line.replace("User-agent:", "").trim())
      .filter(Boolean);

    return bots.length > 0 ? bots : [];
  } catch {
    return [];
  }
}

const getRobotsTxt = (sitemapURL: URL, bots: string[]) => {
  const aiBotStanzas = bots
    .map((bot) => `User-agent: ${bot}\nAllow: /`)
    .join("\n\n");

  return `User-agent: *\nAllow: /\n\n${aiBotStanzas}\n\nSitemap: ${sitemapURL.href}`;
};

const bots = await fetchAiBots();

export const GET: APIRoute = async ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);

  return new Response(getRobotsTxt(sitemapURL, bots), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
