import type { InferEntrySchema } from "astro:content";

import { shortTitle } from "./post";

interface Post {
  data: InferEntrySchema<"posts">;
  id: string;
}

const normalizeTag = (tag: string) => tag.toLowerCase();

const filterUsableTags = (tags: string[], stop: Set<string>) => {
  return tags.map(normalizeTag).filter((tag) => !stop.has(tag));
};

const normalizeNonNegative = (
  value: number | undefined,
  defaultValue: number,
) => {
  const v = value ?? defaultValue;

  return Number.isFinite(v) ? Math.max(0, v) : Math.max(0, defaultValue);
};

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
   * Minimum number of shared tags required for a post to be considered related.
   */
  minimumSharedTags?: number;
  /**
   * Weight for recency bias. 0 means no bias. Small values like 0.03 add subtle bias towards newer posts.
   * Higher values create stronger hyperbolic decay favoring recent content.
   */
  recencyWeight?: number;
  /**
   * Tags to ignore when calculating related posts.
   */
  stopTags?: InferEntrySchema<"posts">["tags"];
  /**
   * How strongly to blend Jaccard similarity into the score.
   * Jaccard = |shared| / |union| — rewards posts where shared tags represent a
   * large fraction of all tags involved, penalizing incidental single-tag matches
   * between posts with otherwise disjoint topic spaces.
   *
   * 0 disables Jaccard blending entirely.
   * Default is 0.5 — Jaccard can add up to +50% when overlap is perfect (jaccard = 1).
   */
  jaccardWeight?: number;
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
  options: RelatedOptions = {},
) => {
  const limit = options.limit ?? 5;
  const minimumSharedTags = options.minimumSharedTags ?? 1;
  const recencyWeight = normalizeNonNegative(options.recencyWeight, 0);
  const jaccardWeight = normalizeNonNegative(options.jaccardWeight, 0.5);
  const stopTags = new Set((options.stopTags ?? []).map(normalizeTag));

  const currentPostTags = new Set(
    filterUsableTags(currentPost.data.tags, stopTags),
  );

  if (currentPostTags.size === 0) return [];

  const tagCounts = getTagFrequencies(allPosts, stopTags);

  const getTagWeight = (tag: string) => {
    const TAG_WEIGHT_BASELINE = 1;
    const TAG_WEIGHT_LOG_OFFSET = 1;

    const count = tagCounts.get(tag);

    if (!count) return 0;

    return TAG_WEIGHT_BASELINE + 1 / Math.log(TAG_WEIGHT_LOG_OFFSET + count);
  };

  const now = Date.now();

  const calculateMonthsSince = (date: Date) => {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const DAYS_PER_MONTH = 30.44; // 365.25 / 12
    const MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DAY * DAYS_PER_MONTH;

    return Math.max(0, (now - +date) / MILLISECONDS_PER_MONTH);
  };

  return allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      const postTags = new Set(filterUsableTags(post.data.tags, stopTags));

      if (postTags.size === 0) return null;

      const sharedTags = [...postTags].filter((tag) =>
        currentPostTags.has(tag),
      );

      const tagScore = sharedTags.reduce(
        (sum, tag) => sum + getTagWeight(tag),
        0,
      );

      /**
       * Jaccard similarity: |shared| / |union|
       * Rewards posts where shared tags cover a large fraction of all tags
       * involved, penalizing incidental single-tag matches between posts with
       * otherwise disjoint topic spaces.
       */
      let jaccardBoost = 1;

      if (jaccardWeight) {
        const unionSize =
          currentPostTags.size + postTags.size - sharedTags.length;
        const jaccard = unionSize > 0 ? sharedTags.length / unionSize : 0;

        jaccardBoost = 1 + jaccardWeight * jaccard;
      }

      const monthsOld = calculateMonthsSince(post.data.publishDate);

      /**
       * Hyperbolic recency decay: 1 / (1 + recencyWeight * monthsOld)
       * recencyWeight = 0 → no decay; larger values favor newer content more strongly.
       */
      const recencyDecay = recencyWeight
        ? 1 / (1 + recencyWeight * monthsOld)
        : 1;

      return {
        post,
        score: tagScore * jaccardBoost * recencyDecay,
        sharedTagCount: sharedTags.length,
      };
    })
    .filter(Boolean)
    .filter((result) => {
      return result.sharedTagCount >= minimumSharedTags && result.score > 0;
    })
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
