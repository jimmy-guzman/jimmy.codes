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
 * Get all unique tags from an array of posts, sorted by frequency (descending) and alphabetically.
 *
 * @param posts Array of posts with optional tags in their data
 *
 * @returns Array of unique tags sorted by frequency (descending), then alphabetically
 */
export const getAllTags = (posts: { data: { tags?: string[] } }[]) => {
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    const uniqueTags = [...new Set(post.data.tags)];

    for (const tag of uniqueTags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [...tagCounts.entries()]
    .toSorted(([tagA, countA], [tagB, countB]) => {
      return countB - countA || tagA.localeCompare(tagB);
    })
    .map(([tag, count]) => ({ count, tag }));
};

/**
 *  Estimate the maximum number of visible tags based on their lengths.
 *
 * @param tags Array of tags with their counts
 *
 * @returns
 */
export const guessMaxVisible = (tags: { count: number; tag: string }[]) => {
  const avgCharsPerLine = 40;
  const maxLines = 2;
  const targetChars = avgCharsPerLine * maxLines;
  const paddingPerTag = 4;

  let charCount = 0;

  const visibleCount = tags.findIndex(({ tag }) => {
    charCount += tag.length + paddingPerTag;

    return charCount > targetChars;
  });

  return Math.max(visibleCount === -1 ? tags.length : visibleCount, 3);
};
