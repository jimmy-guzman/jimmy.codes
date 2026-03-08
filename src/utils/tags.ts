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

const DEFAULT_OPTIONS = {
  avgCharsPerLine: 34,
  maxLines: 2,
  overflowBadgeWidth: 11,
  paddingPerTag: 3,
} as const;

type Options = Partial<typeof DEFAULT_OPTIONS>;

/**
 * Estimate the maximum number of visible tags by simulating row wrapping.
 *
 * Tags are placed left-to-right onto rows. When a tag would overflow the
 * current row, it starts a new row. Once the number of rows exceeds
 * `maxLines`, the tag that caused the overflow (and everything after) is
 * hidden. This mirrors how a `flex-wrap` layout actually behaves.
 *
 * When truncation occurs a "+N more" overflow badge is rendered after the
 * visible tags. The simulation reserves space for it on the last line —
 * if it wouldn't fit, one additional tag is hidden to make room.
 *
 * @param tags Array of tags with their counts
 *
 * @param options Optional settings for the estimation
 *
 * @param options.avgCharsPerLine Average characters that fit per row (default: 34)
 *
 * @param options.maxLines Maximum number of lines before truncating (default: 2)
 *
 * @param options.paddingPerTag Horizontal padding/gap overhead per tag in chars (default: 3)
 *
 * @param options.overflowBadgeWidth Width in chars of the "+N more" overflow badge (default: 11)
 *
 * @returns Estimated maximum number of visible tags
 */
export const guessMaxVisible = (
  tags: { count: number; tag: string }[],
  options?: Options,
) => {
  const { avgCharsPerLine, maxLines, paddingPerTag, overflowBadgeWidth } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  let lineChars = 0;
  let prevLineChars = 0;
  let lines = 1;

  const visibleCount = tags.findIndex(({ tag }) => {
    const tagWidth = tag.length + paddingPerTag;
    const wraps = lineChars + tagWidth > avgCharsPerLine;

    if (wraps) {
      lines++;
      prevLineChars = lineChars;
      lineChars = tagWidth;
    } else {
      lineChars += tagWidth;
    }

    return lines > maxLines;
  });

  const truncated = visibleCount !== -1;
  const count = truncated ? visibleCount : tags.length;
  const clamped = Math.min(Math.max(count, 3), tags.length);

  if (clamped < tags.length) {
    const lastLineChars =
      truncated && lines > maxLines ? prevLineChars : lineChars;
    const badgeOverflows = lastLineChars + overflowBadgeWidth > avgCharsPerLine;

    if (badgeOverflows) {
      return Math.min(Math.max(clamped - 1, 3), tags.length);
    }
  }

  return clamped;
};
