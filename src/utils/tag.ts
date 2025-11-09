/**
 * Lowercase and replace one or more spaces or forward slashes with a hyphen in a tag.
 *
 * @param tag The tag to slugify
 *
 * @returns The slugified tag
 */
export const slugifyTag = (tag: string) => {
  return tag.toLowerCase().replaceAll(/[\s/]+/g, "-");
};

/**
 * Extract all unique tags from an array of posts, sorted by popularity.
 *
 * @param posts Array of posts with optional tags in their data
 *
 * @returns Array of unique tags sorted by frequency (descending)
 */
export const getAllTags = (posts: { data: { tags?: string[] } }[]) => {
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [...tagCounts.entries()]
    .toSorted((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
};
