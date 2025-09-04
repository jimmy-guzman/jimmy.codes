import { getCollection } from "astro:content";

import rss from "@astrojs/rss";

import { pages } from "../configs/pages";

export async function GET(context: { site: string }) {
  const blog = await getCollection("posts");

  return rss({
    title: pages.rss.title,
    description: pages.rss.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
