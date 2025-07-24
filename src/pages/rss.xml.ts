import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context: { site: string }) {
  const blog = await getCollection("posts");

  return rss({
    title: "jimmy.codes | Blog",
    description:
      "Technical articles on scalable systems, developer experience, and modern web development by Lead Engineer Jimmy Guzman.",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}
