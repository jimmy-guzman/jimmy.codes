import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context: { site: string }) {
  const blog = await getCollection("posts");
  const notes = await getCollection("notes");

  const items = [
    ...blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    ...notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.publishDate,
      description: note.data.description,
      link: `/notes/${note.slug}/`,
    })),
  ];

  return rss({
    title: "jimmy.codes | RSS Feed",
    description:
      "Articles and notes on the craft of building software, architecture, system design, code, and developer experience.",
    site: context.site,
    items: items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
  });
}
