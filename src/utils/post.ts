import type { CollectionEntry } from "astro:content";

/**
 * Get the short title for a post, preferring the heading if available.
 *
 * @param post The post to get the short title for
 * @returns The short title of the post
 */
export const shortTitle = (post: Pick<CollectionEntry<"posts">, "data">) => {
  return post.data.shortTitle ?? post.data.title;
};

export const getPostByYear = (posts: CollectionEntry<"posts">[]) => {
  return Object.entries(
    Object.groupBy(posts, (post) => post.data.publishDate.getFullYear()),
  ).sort(([a], [b]) => Number.parseInt(b, 10) - Number.parseInt(a, 10));
};
