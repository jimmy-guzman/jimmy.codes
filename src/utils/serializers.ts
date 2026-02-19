export function toRawMarkdown(post: {
  data: Record<string, unknown>;
  body: string;
}) {
  const frontmatter = Object.entries(post.data)
    .map(([key, value]) => {
      if (value instanceof Date) {
        return `${key}: ${value.toISOString().split("T")[0]}`;
      }

      if (Array.isArray(value)) return `${key}: ${JSON.stringify(value)}`;

      return `${key}: ${value}`;
    })
    .join("\n");

  return `---\n${frontmatter}\n---\n\n${post.body}`;
}
