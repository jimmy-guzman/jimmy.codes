import type { InferEntrySchema } from "astro:content";

import { shortTitle } from "./content";

interface Post {
  data: InferEntrySchema<"posts">;
  id: string;
}

const JACCARD_WEIGHT = 0.5;

const MILLISECONDS_PER_MONTH = 1000 * 60 * 60 * 24 * (365.25 / 12);

interface RelatedOptions {
  limit?: number;
  /**
   * Weight for recency bias. 0 means no bias. Small values like 0.03 add subtle bias towards newer posts.
   * Higher values create stronger hyperbolic decay favoring recent content.
   */
  recencyWeight?: number;
}

/**
 * Find related posts for a given post based on shared tags.
 *
 * Scores candidates using IDF-weighted tag overlap blended with Jaccard
 * similarity, so posts that share a high proportion of their tag space rank
 * above posts with only an incidental single-tag match. An optional recency
 * decay can further favor newer content.
 */
export const getRelatedByTags = (
  allPosts: Post[],
  currentPost: Post,
  { limit = 5, recencyWeight = 0 }: RelatedOptions = {},
) => {
  const currentPostTags = new Set(currentPost.data.tags);
  const tagCounts = new Map<string, number>();

  for (const post of allPosts) {
    for (const tag of new Set(post.data.tags)) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const getTagWeight = (tag: string) => {
    return 1 + 1 / Math.log(1 + (tagCounts.get(tag) ?? 0));
  };

  const now = Date.now();

  return allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      const postTags = new Set(post.data.tags);
      const sharedTags = [...postTags].filter((tag) =>
        currentPostTags.has(tag),
      );

      const tagScore = sharedTags.reduce(
        (sum, tag) => sum + getTagWeight(tag),
        0,
      );

      const unionSize =
        currentPostTags.size + postTags.size - sharedTags.length;
      const jaccardBoost = 1 + (JACCARD_WEIGHT * sharedTags.length) / unionSize;

      const monthsOld = Math.max(
        0,
        (now - +post.data.publishDate) / MILLISECONDS_PER_MONTH,
      );

      /**
       * Hyperbolic recency decay: 1 / (1 + recencyWeight * monthsOld)
       * recencyWeight = 0 → no decay; larger values favor newer content more strongly.
       */
      const recencyDecay = 1 / (1 + recencyWeight * monthsOld);

      return {
        post,
        score: tagScore * jaccardBoost * recencyDecay,
        sharedTagCount: sharedTags.length,
      };
    })
    .filter((result) => result.sharedTagCount > 0)
    .toSorted((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (+b.post.data.publishDate !== +a.post.data.publishDate) {
        return +b.post.data.publishDate - +a.post.data.publishDate;
      }

      const titleComparison = shortTitle(a.post).localeCompare(
        shortTitle(b.post),
        "en",
        {
          sensitivity: "base",
        },
      );

      if (titleComparison !== 0) return titleComparison;

      return a.post.id.localeCompare(b.post.id, "en", {
        sensitivity: "base",
      });
    })
    .slice(0, limit)
    .map((result) => ({
      slug: result.post.id,
      title: shortTitle(result.post),
    }));
};
