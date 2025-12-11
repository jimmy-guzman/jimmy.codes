import { getCollection } from "astro:content";

import rss from "@astrojs/rss";

import { pages } from "@/configs/pages";

export async function GET(context: { site: string }) {
  const blog = await getCollection("posts");

  return rss({
    description: pages.rss.description,
    items: blog.map((post) => ({
      categories: post.data.tags,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      pubDate: post.data.publishDate,
      title: post.data.title,
    })),
    site: context.site,
    title: pages.rss.title,
  });
}
