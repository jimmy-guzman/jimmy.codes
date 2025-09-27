import type { InferEntrySchema } from "astro:content";
import { shortTitle } from "./post";

interface Post {
  slug: string;
  data: InferEntrySchema<"posts">;
}

const normalizeTag = (tag: string) => tag.toLowerCase();

const filterUsableTags = (tags: string[], stop: Set<string>) => {
  return tags.map(normalizeTag).filter((tag) => !stop.has(tag));
};

/**
 * Pre-compute tag frequencies across all posts for performance optimization.
 * This prevents recalculating tag counts on every function call.
 */
const getTagFrequencies = (allPosts: Post[], stopTags: Set<string>) => {
  const tagCounts = new Map<string, number>();

  for (const post of allPosts) {
    const uniqueTagsForPost = new Set(
      filterUsableTags(post.data.tags, stopTags),
    );

    for (const tag of uniqueTagsForPost) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return tagCounts;
};

interface RelatedOptions {
  limit?: number;
  /**
   * Tags to ignore when calculating related posts.
   */
  stopTags?: string[];
  /**
   * Minimum number of shared tags required for a post to be considered related.
   */
  minimumSharedTags?: number;
  /**
   * Weight for recency bias. 0 means no bias. Small values like 0.03 add subtle bias towards newer posts.
   * Higher values create stronger exponential decay favoring recent content.
   */
  recencyWeight?: number;
}

/**
 * Find related posts based on shared tags.
 *
 * @param allPosts All posts to consider for relatedness
 * @param currentPost The current post to find related posts for
 * @param options Optional parameters to customize relatedness calculation
 *
 * @returns An array of related posts with their slug and title
 */
export const getRelatedByTags = (
  allPosts: Post[],
  currentPost: Post,
  options: RelatedOptions = {},
) => {
  const limit = options.limit ?? 5;
  const minimumSharedTags = options.minimumSharedTags ?? 1;
  const recencyWeight = options.recencyWeight ?? 0;
  const stopTags = new Set((options.stopTags ?? []).map(normalizeTag));

  const currentPostTags = new Set(
    filterUsableTags(currentPost.data.tags, stopTags),
  );

  if (currentPostTags.size === 0) return [];

  const tagCounts = getTagFrequencies(allPosts, stopTags);

  /**
   * Calculate tag weight using inverse frequency weighting.
   * Rare tags get higher weights, making them more significant for relatedness.
   */
  const getTagWeight = (tag: string) => {
    /**
     * Ensures every tag has a minimum weight, even if common.
     */
    const TAG_WEIGHT_BASELINE = 1;
    /**
     * Prevents division by zero and smooths the weighting curve.
     */
    const TAG_WEIGHT_LOG_OFFSET = 1;

    const count = tagCounts.get(tag);

    if (!count) return 0; // unseen/filtered tags have no weight

    return TAG_WEIGHT_BASELINE + 1 / Math.log(TAG_WEIGHT_LOG_OFFSET + count);
  };

  const now = Date.now();

  /**
   * Calculate months elapsed since publication date.
   * Used for recency decay in scoring algorithm.
   */
  const calculateMonthsSince = (date: Date) => {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    /**
     * Using average month length of 30.44 days (365.25 days / 12 months)
     */
    const DAYS_PER_MONTH = 30.44;
    const MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DAY * DAYS_PER_MONTH;

    return Math.max(0, (now - +date) / MILLISECONDS_PER_MONTH);
  };

  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const postTags = new Set(filterUsableTags(post.data.tags, stopTags));

      if (postTags.size === 0) return null;

      const sharedTags = [...postTags].filter((tag) => {
        return currentPostTags.has(tag);
      });

      const tagScore = sharedTags.reduce(
        (sum, tag) => sum + getTagWeight(tag),
        0,
      );

      const monthsOld = calculateMonthsSince(post.data.publishDate);

      /**
       * Apply exponential recency decay: newer posts get higher scores.
       * Formula: 1 / (1 + recencyWeight * monthsOld)
       * - When recencyWeight = 0: no decay (recencyDecay = 1)
       * - Higher recencyWeight values create stronger preference for recent content
       * - Exponential decay means very old posts quickly lose relevance
       */
      const recencyDecay = recencyWeight
        ? 1 / (1 + recencyWeight * monthsOld)
        : 1;

      return {
        post,
        sharedTagCount: sharedTags.length,
        score: tagScore * recencyDecay,
      };
    })
    .filter((result): result is NonNullable<typeof result> => !!result)
    .filter((result) => {
      return result.sharedTagCount >= minimumSharedTags && result.score > 0;
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (+b.post.data.publishDate !== +a.post.data.publishDate) {
        return +b.post.data.publishDate - +a.post.data.publishDate;
      }

      const titleCmp = shortTitle(a.post).localeCompare(
        shortTitle(b.post),
        "en",
        {
          sensitivity: "base",
        },
      );

      if (titleCmp !== 0) return titleCmp;

      return a.post.slug.localeCompare(b.post.slug, "en", {
        sensitivity: "base",
      }); // deterministic
    })
    .slice(0, limit)
    .map((result) => ({
      slug: result.post.slug,
      title: shortTitle(result.post),
    }));
};
