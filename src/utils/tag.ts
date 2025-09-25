/**
 * Lowercase and replace one or more spaces or forward slashes with a hyphen in a tag.
 *
 * @param tag The tag to slugify
 * @returns The slugified tag
 */
export const slugifyTag = (tag: string) => {
  return tag.toLowerCase().replace(/[\s/]+/g, "-");
};

/**
 * Extract all unique tags from an array of posts.
 *
 * @param posts Array of posts with optional tags in their data
 * @returns Array of unique tags
 */
export const getAllTags = (posts: { data: { tags?: string[] } }[]) => {
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet);
};
