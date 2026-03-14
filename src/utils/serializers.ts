import type { CollectionEntry } from "astro:content";
import { stringify } from "yaml";

export function toRawMarkdown(post: CollectionEntry<"posts">) {
  const data: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(post.data)) {
    data[key] =
      value instanceof Date ? value.toISOString().split("T")[0] : value;
  }

  const frontmatter = stringify(data).trimEnd();

  return `---\n${frontmatter}\n---\n\n${post.body}`;
}
