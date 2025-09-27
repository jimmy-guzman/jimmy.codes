import type { InferEntrySchema } from "astro:content";

const normalizeTag = (tag: string) => tag.toLowerCase();

const filterUsableTags = (tags: string[], stop: Set<string>) => {
  return tags.map(normalizeTag).filter((tag) => !stop.has(tag));
};

interface Post {
  slug: string;
  data: InferEntrySchema<"posts">;
}

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

  const tagCounts = new Map<string, number>();

  for (const post of allPosts) {
    const uniqueTagsForPost = new Set(
      filterUsableTags(post.data.tags, stopTags),
    );

    for (const tag of uniqueTagsForPost) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const getTagWeight = (tag: string) => {
    const count = tagCounts.get(tag);

    if (!count) return 0; // unseen/filtered tags have no weight

    return 1 + 1 / Math.log(1 + count);
  };

  const now = Date.now();

  const calculateMonthsSince = (date: Date) => {
    return Math.max(0, (now - +date) / (1000 * 60 * 60 * 24 * 30));
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

      const titleCmp = (a.post.data.heading ?? a.post.data.title).localeCompare(
        b.post.data.heading ?? b.post.data.title,
        "en",
        { sensitivity: "base" },
      );

      if (titleCmp !== 0) return titleCmp;

      return a.post.slug.localeCompare(b.post.slug, "en", {
        sensitivity: "base",
      }); // deterministic
    })
    .slice(0, limit)
    .map((result) => ({
      slug: result.post.slug,
      title: result.post.data.heading ?? result.post.data.title,
    }));
};
