/**
 * Get the short title for a post, preferring the heading if available.
 *
 * @param post The post to get the short title for
 *
 * @param post.data The data of the post to get the short title for
 *
 * @param post.data.shortTitle The short title of the post
 *
 * @param post.data.title The full title of the post
 *
 * @returns The short title of the post
 */
export const shortTitle = (post: {
  data: { shortTitle?: string; title: string };
}) => {
  return post.data.shortTitle ?? post.data.title;
};

export const getPostByYear = <T extends { data: { publishDate: Date } }>(
  posts: T[],
) => {
  return Object.entries(
    Object.groupBy(posts, (post) => post.data.publishDate.getFullYear()),
  ).toSorted(([a], [b]) => Number.parseInt(b, 10) - Number.parseInt(a, 10));
};
