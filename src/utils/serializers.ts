import type { CollectionEntry } from "astro:content";
import { stringify } from "yaml";
import { pages } from "@/configs/pages";
import {
  techAI,
  techBackend,
  techFrontend,
  techFullStack,
  techInfrastructure,
  techLanguages,
  techRuntimes,
  techTooling,
  titles,
  usageBadge,
} from "@/configs/tech";
import { urls } from "@/configs/urls";
import { readingTime, sortByPublishDate } from "@/utils/content";
import { getAllTags, slugifyTag } from "@/utils/tags";

export function toRawMarkdown(post: CollectionEntry<"posts">) {
  const data: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(post.data)) {
    data[key] =
      value instanceof Date ? value.toISOString().split("T")[0] : value;
  }

  const frontmatter = stringify(data).trimEnd();

  return `---\n${frontmatter}\n---\n\n${post.body}`;
}

export function toRawPageMarkdown(page: CollectionEntry<"pages">) {
  const frontmatter = stringify(page.data).trimEnd();

  return `---\n${frontmatter}\n---\n\n${page.body}`;
}

export function toUsesMarkdown() {
  const frontmatter = stringify(pages.uses).trimEnd();

  const intro = `What I use to build software, from the tools on my desk to the technologies I play with.

- **Editor** — [VS Code](https://code.visualstudio.com/) or [IntelliJ IDEA](https://www.jetbrains.com/idea/), trying [Zed](https://zed.dev/)
- **Terminal** — [Ghostty](https://ghostty.org/) with [Starship](https://starship.rs/)
- **AI Coding Agent** — [OpenCode](https://opencode.ai/)
- **Laptop** — MacBook Pro 16" M4 Max, 128GB RAM, 4TB SSD
- **Keyboard** — HHKB Professional HYBRID Type-S
- **Mouse** — Logitech MX Master 3S`;

  const techSections = [
    { items: techLanguages, title: titles.languages },
    { items: techRuntimes, title: titles.runtimes },
    { items: techFullStack, title: titles.fullStack },
    { items: techFrontend, title: titles.frontend },
    { items: techTooling, title: titles.tooling },
    { items: techBackend, title: titles.backend },
    { items: techInfrastructure, title: titles.infrastructure },
    { items: techAI, title: titles.ai },
  ];

  const tables = techSections
    .map(({ title, items }) => {
      const rows = items
        .map(
          (tech) =>
            `| [${tech.title}](${tech.link}) | ${usageBadge[tech.usage].label} |`,
        )
        .join("\n");

      return `## ${title}\n\n| Technology | Usage |\n|---|---|\n${rows}`;
    })
    .join("\n\n");

  return `---\n${frontmatter}\n---\n\n${intro}\n\n${tables}`;
}

export function toBlogIndexMarkdown(posts: CollectionEntry<"posts">[]) {
  const frontmatter = stringify(pages.blog).trimEnd();
  const sorted = [...posts].sort(sortByPublishDate);

  const rows = sorted
    .map((post) => {
      const date = post.data.publishDate.toISOString().split("T")[0];
      const minutes = readingTime(post.body ?? "");

      return `- [${post.data.title}](/blog/${post.id}) — ${date} · ${minutes} min read`;
    })
    .join("\n");

  return `---\n${frontmatter}\n---\n\n# Blog\n\n${rows}`;
}

export function toTagsMarkdown(posts: CollectionEntry<"posts">[]) {
  const frontmatter = stringify(pages.tags).trimEnd();
  const tags = getAllTags(posts);

  const rows = tags
    .map(
      ({ tag, count }) =>
        `- [${tag}](/blog/tags/${slugifyTag(tag)}) — ${count} ${count === 1 ? "post" : "posts"}`,
    )
    .join("\n");

  return `---\n${frontmatter}\n---\n\n# Tags\n\n${rows}`;
}

export function toLlmsTxtMarkdown(posts: CollectionEntry<"posts">[]) {
  const base = urls.site;
  const sorted = [...posts].sort(sortByPublishDate);

  const postRows = sorted
    .map(
      (post) =>
        `- [${post.data.title}](${base}/blog/${post.id}.md): ${post.data.description}`,
    )
    .join("\n");

  return `# Jimmy Guzman Moreno

> ${pages.site.description}

## Pages

- [Home](${base}/index.md): Personal introduction and site navigation
- [About](${base}/about.md): Background, engineering wins, and career story
- [Uses](${base}/uses.md): Tech stack, tools, and daily setup

## Blog

- [Blog](${base}/blog.md): Full list of all posts
${postRows}

## Optional

- [All tags](${base}/blog/tags.md): Browse posts by tag
- [RSS feed](${base}/blog/rss.xml): Syndication feed with post metadata`;
}
