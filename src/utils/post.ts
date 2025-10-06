import type { InferEntrySchema } from "astro:content";

interface Post {
  slug: string;
  data: InferEntrySchema<"posts">;
}

/**
 * Get the short title for a post, preferring the heading if available.
 *
 * @param post The post to get the short title for
 * @returns The short title of the post
 */
export const shortTitle = (post: Post) => {
  return post.data.shortTitle ?? post.data.title;
};
