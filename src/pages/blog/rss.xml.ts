import { getCollection } from "astro:content";

import rss from "@astrojs/rss";

import { pages } from "@/configs/pages";

export async function GET(context: { site: string }) {
  const blog = await getCollection("posts");
  const publishDates = blog.map(({ data }) => data.publishDate.getTime());
  const latestTimestamp = blog.length ? Math.max(...publishDates) : Date.now();
  const lastBuildDate = new Date(latestTimestamp).toUTCString();

  return rss({
    customData: [
      `<atom:link href="${new URL("blog/rss.xml", context.site)}" rel="self" type="application/rss+xml" />`,
      `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    ].join(""),
    description: pages.rss.description,
    items: blog.map((post) => ({
      categories: post.data.tags,
      description: post.data.description,
      link: `/blog/${post.id}`,
      pubDate: post.data.publishDate,
      title: post.data.title,
    })),
    site: context.site,
    title: pages.rss.title,
    trailingSlash: false,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
  });
}
