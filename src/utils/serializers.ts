import type { CollectionEntry } from "astro:content";
import { stringify } from "yaml";
import { BASE_TITLE, pages } from "@/configs/pages";
import { techSections, usageBadge } from "@/configs/tech";
import { urls } from "@/configs/urls";
import { readingTime, sortByPublishDate } from "@/utils/content";
import { getAllTags, slugifyTag } from "@/utils/tags";

const withFrontmatter = (data: object, body: string) => {
  return `---\n${stringify(data).trimEnd()}\n---\n\n${body}`;
};

export function toUsesMarkdown(source: string) {
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

  return `${source.trimEnd()}\n\n${tables}`;
}

const toPostList = (posts: CollectionEntry<"posts">[]) => {
  return posts
    .toSorted(sortByPublishDate)
    .map((post) => {
      const date = post.data.publishDate.toISOString().split("T")[0];
      const minutes = readingTime(post.body ?? "");

      return `- [${post.data.title}](${urls.site}/blog/${post.id}.md) — ${date} · ${minutes} min read`;
    })
    .join("\n");
};

export function toBlogIndexMarkdown(posts: CollectionEntry<"posts">[]) {
  return withFrontmatter(pages.blog, `# Blog\n\n${toPostList(posts)}`);
}

export function toTagMarkdown(tag: string, posts: CollectionEntry<"posts">[]) {
  const tagged = posts.filter((post) => post.data.tags.includes(tag));

  return withFrontmatter(
    {
      description: `All blog posts tagged with "${tag}"`,
      title: `Posts tagged "${tag}" | ${BASE_TITLE}`,
    },
    `# Posts tagged "${tag}"\n\n${toPostList(tagged)}`,
  );
}

export function toTagsMarkdown(posts: CollectionEntry<"posts">[]) {
  const tags = getAllTags(posts);

  const rows = tags
    .map(
      ({ tag, count }) =>
        `- [${tag}](${urls.site}/blog/tags/${slugifyTag(tag)}.md) — ${count} ${count === 1 ? "post" : "posts"}`,
    )
    .join("\n");

  return withFrontmatter(pages.tags, `# Tags\n\n${rows}`);
}

export function toLlmsTxtMarkdown(posts: CollectionEntry<"posts">[]) {
  const base = urls.site;
  const sorted = posts.toSorted(sortByPublishDate);

  const postRows = sorted
    .map(
      ({ data, id }) =>
        `- [${data.title}](${base}/blog/${id}.md): ${data.description}`,
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
