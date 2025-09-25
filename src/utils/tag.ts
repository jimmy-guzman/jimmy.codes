export const slugifyTag = (tag: string) => {
  return tag.toLowerCase().replace(/[\s/]+/g, "-");
};

export const getAllTags = (posts: { data: { tags?: string[] } }[]) => {
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet);
};
