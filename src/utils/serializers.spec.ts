import type { CollectionEntry } from "astro:content";
import { describe, expect, it } from "vitest";
import {
  toBlogIndexMarkdown,
  toLlmsTxtMarkdown,
  toRawMarkdown,
  toRawPageMarkdown,
  toTagsMarkdown,
  toUsesMarkdown,
} from "./serializers";

describe("toRawMarkdown", () => {
  it("should wrap content in frontmatter delimiters", () => {
    const result = toRawMarkdown({
      body: "Body text",
      data: {
        description: "Test description",
        keywords: ["test"],
        publishDate: new Date("2024-01-01"),
        tags: ["TypeScript"],
        title: "Hello",
      },
    } as CollectionEntry<"posts">);

    expect(result).toMatch(/^---\n/);
    expect(result).toContain("\n---\n\nBody text");
  });

  it("should output string values as-is", () => {
    const result = toRawMarkdown({
      body: "",
      data: {
        description: "Test description",
        keywords: ["test"],
        publishDate: new Date("2024-01-01"),
        tags: ["TypeScript"],
        title: "My Post",
      },
    } as CollectionEntry<"posts">);

    expect(result).toContain("title: My Post");
  });

  it("should format Date values as YYYY-MM-DD", () => {
    const result = toRawMarkdown({
      body: "",
      data: {
        description: "Test description",
        keywords: ["test"],
        publishDate: new Date("2024-03-15T12:00:00Z"),
        tags: ["TypeScript"],
        title: "Test",
      },
    } as CollectionEntry<"posts">);

    expect(result).toContain("publishDate: 2024-03-15");
    expect(result).not.toContain("T12:00");
  });

  it("should serialize array values as block style YAML", () => {
    const result = toRawMarkdown({
      body: "",
      data: {
        description: "Test description",
        keywords: ["a", "b"],
        publishDate: new Date("2024-01-01"),
        tags: ["TypeScript"],
        title: "Test",
      },
    } as CollectionEntry<"posts">);

    expect(result).toContain("keywords:\n  - a\n  - b");
  });

  it("should handle multiple frontmatter fields", () => {
    const result = toRawMarkdown({
      body: "",
      data: {
        description: "Test description",
        keywords: ["x"],
        publishDate: new Date("2024-01-01"),
        tags: ["TypeScript"],
        title: "Post",
      },
    } as CollectionEntry<"posts">);

    expect(result).toContain("title: Post");
    expect(result).toContain("tags:\n  - TypeScript");
  });

  it("should handle an empty body", () => {
    const result = toRawMarkdown({
      body: "",
      data: {
        description: "Test description",
        keywords: ["test"],
        publishDate: new Date("2024-01-01"),
        tags: ["TypeScript"],
        title: "No Body",
      },
    } as CollectionEntry<"posts">);

    expect(result).toContain("title: No Body");
    expect(result).toMatch(/^---\n[\s\S]*---\n\n$/);
  });

  it("should properly serialize strings with special YAML characters", () => {
    const titleWithQuotes =
      'Auto Apply "Suggest Canonical Classes" in Tailwind (VS Code)';
    const descriptionWithColon =
      "Schema-driven REST APIs in TypeScript: typed errors, explicit dependencies.";

    const result = toRawMarkdown({
      body: "",
      data: {
        description: descriptionWithColon,
        keywords: ["test"],
        publishDate: new Date("2024-01-01"),
        tags: ["TypeScript"],
        title: titleWithQuotes,
      },
    } as CollectionEntry<"posts">);

    // description contains a colon so must be quoted by the YAML library
    expect(result).toMatch(/description: ".+"/);
    // title contains double quotes — library escapes them; value must be present
    expect(result).toContain("title:");
    expect(result).toContain("Suggest Canonical Classes");
  });

  it("should omit optional fields when not provided", () => {
    const result = toRawMarkdown({
      body: "",
      data: {
        description: "Test description",
        keywords: ["test"],
        publishDate: new Date("2024-01-01"),
        tags: ["TypeScript"],
        title: "No Optionals",
      },
    } as CollectionEntry<"posts">);

    expect(result).not.toContain("shortTitle:");
    expect(result).not.toContain("updatedDate:");
    expect(result).not.toContain("undefined");
  });
});

describe("toRawPageMarkdown", () => {
  it("should wrap content in frontmatter delimiters", () => {
    const result = toRawPageMarkdown({
      body: "Page body text",
      data: {
        description: "A page description",
        heading: "My Heading",
        keywords: ["test"],
        title: "My Page",
      },
    } as CollectionEntry<"pages">);

    expect(result).toMatch(/^---\n/);
    expect(result).toContain("\n---\n\nPage body text");
  });

  it("should include all frontmatter fields", () => {
    const result = toRawPageMarkdown({
      body: "",
      data: {
        description: "A page description",
        heading: "My Heading",
        keywords: ["one", "two"],
        title: "My Page Title",
      },
    } as CollectionEntry<"pages">);

    expect(result).toContain("title: My Page Title");
    expect(result).toContain("heading: My Heading");
    expect(result).toContain("description: A page description");
    expect(result).toContain("keywords:\n  - one\n  - two");
  });

  it("should handle an empty body", () => {
    const result = toRawPageMarkdown({
      body: "",
      data: {
        description: "desc",
        heading: "H",
        keywords: ["kw"],
        title: "T",
      },
    } as CollectionEntry<"pages">);

    expect(result).toMatch(/^---\n[\s\S]*---\n\n$/);
  });
});

describe("toUsesMarkdown", () => {
  it("should wrap content in frontmatter delimiters", () => {
    const result = toUsesMarkdown();

    expect(result).toMatch(/^---\n/);
    expect(result).toContain("\n---\n\n");
  });

  it("should include frontmatter from pages.uses", () => {
    const result = toUsesMarkdown();

    expect(result).toContain("title:");
    expect(result).toContain("heading: Uses");
    expect(result).toContain("description:");
    expect(result).toContain("keywords:");
  });

  it("should contain section headings for each tech category", () => {
    const result = toUsesMarkdown();

    expect(result).toContain("## Languages");
    expect(result).toContain("## Runtimes");
    expect(result).toContain("## Full Stack");
    expect(result).toContain("## Frontend");
    expect(result).toContain("## Tooling");
    expect(result).toContain("## Backend");
    expect(result).toContain("## Infrastructure");
    expect(result).toContain("## AI");
  });

  it("should render tables with a Technology and Usage column", () => {
    const result = toUsesMarkdown();

    expect(result).toContain("| Technology | Usage |");
    expect(result).toContain("|---|---|");
  });

  it("should include the hardware intro section", () => {
    const result = toUsesMarkdown();

    expect(result).toContain("**Editor**");
    expect(result).toContain("**Terminal**");
    expect(result).toContain("**Laptop**");
  });

  it("should render each tech item as a markdown table row with a link", () => {
    const result = toUsesMarkdown();

    // Every data row should follow the | [Title](url) | Label | pattern
    const dataRows = result
      .split("\n")
      .filter((line) => line.startsWith("| ["));

    expect(dataRows.length).toBeGreaterThan(0);
    for (const row of dataRows) {
      expect(row).toMatch(/^\| \[.+\]\(https:\/\/.+\) \| \w+ \|$/);
    }
  });
});

describe("toBlogIndexMarkdown", () => {
  const makePost = (id: string, title: string, publishDate: Date) =>
    ({
      body: "",
      data: {
        description: "desc",
        keywords: ["kw"],
        publishDate,
        tags: ["TypeScript"],
        title,
      },
      id,
    }) as CollectionEntry<"posts">;

  it("should wrap content in frontmatter delimiters", () => {
    const result = toBlogIndexMarkdown([]);

    expect(result).toMatch(/^---\n/);
    expect(result).toContain("\n---\n\n");
  });

  it("should include frontmatter from pages.blog", () => {
    const result = toBlogIndexMarkdown([]);

    expect(result).toContain("title:");
    expect(result).toContain("heading: Blog");
    expect(result).toContain("description:");
    expect(result).toContain("keywords:");
  });

  it("should render each post as a list item with a link", () => {
    const posts = [makePost("my-post", "My Post", new Date("2024-01-01"))];
    const result = toBlogIndexMarkdown(posts);

    expect(result).toContain("- [My Post](/blog/my-post)");
  });

  it("should sort posts newest first", () => {
    const posts = [
      makePost("older", "Older Post", new Date("2023-01-01")),
      makePost("newer", "Newer Post", new Date("2024-06-01")),
    ];
    const result = toBlogIndexMarkdown(posts);

    expect(result.indexOf("Newer Post")).toBeLessThan(
      result.indexOf("Older Post"),
    );
  });

  it("should include the publish date in each row", () => {
    const posts = [makePost("a-post", "A Post", new Date("2024-03-15"))];
    const result = toBlogIndexMarkdown(posts);

    expect(result).toContain("2024-03-15");
  });
});

describe("toTagsMarkdown", () => {
  const makePost = (tags: CollectionEntry<"posts">["data"]["tags"]) =>
    ({
      body: "",
      data: {
        description: "desc",
        keywords: ["kw"],
        publishDate: new Date("2024-01-01"),
        tags,
        title: "Post",
      },
      id: "post",
    }) as CollectionEntry<"posts">;

  it("should wrap content in frontmatter delimiters", () => {
    const result = toTagsMarkdown([]);

    expect(result).toMatch(/^---\n/);
    expect(result).toContain("\n---\n\n");
  });

  it("should include frontmatter from pages.tags", () => {
    const result = toTagsMarkdown([]);

    expect(result).toContain("title:");
    expect(result).toContain("heading: All Tags");
    expect(result).toContain("description:");
    expect(result).toContain("keywords:");
  });

  it("should render each tag as a list item with a link", () => {
    const posts = [makePost(["TypeScript", "React"])];
    const result = toTagsMarkdown(posts);

    expect(result).toContain("- [TypeScript](/blog/tags/typescript)");
    expect(result).toContain("- [React](/blog/tags/react)");
  });

  it("should show singular 'post' for a tag with one post", () => {
    const posts = [makePost(["TypeScript"])];
    const result = toTagsMarkdown(posts);

    expect(result).toContain("1 post");
    expect(result).not.toContain("1 posts");
  });

  it("should show plural 'posts' for a tag with multiple posts", () => {
    const posts = [
      makePost(["TypeScript"]),
      { ...makePost(["TypeScript"]), id: "post-2" } as CollectionEntry<"posts">,
    ];
    const result = toTagsMarkdown(posts);

    expect(result).toContain("2 posts");
  });
});

describe("toLlmsTxtMarkdown", () => {
  const makePost = (
    id: string,
    title: string,
    publishDate: Date,
    description = "A post description.",
  ) =>
    ({
      body: "",
      data: {
        description,
        keywords: ["kw"],
        publishDate,
        tags: ["TypeScript"],
        title,
      },
      id,
    }) as CollectionEntry<"posts">;

  it("should open with an H1 containing the site name", () => {
    const result = toLlmsTxtMarkdown([]);

    expect(result).toMatch(/^# Jimmy Guzman Moreno\n/);
  });

  it("should include a blockquote summary on the second line", () => {
    const result = toLlmsTxtMarkdown([]);
    const lines = result.split("\n");

    expect(lines[2]).toMatch(/^> /);
  });

  it("should include a ## Pages section", () => {
    const result = toLlmsTxtMarkdown([]);

    expect(result).toContain("## Pages");
  });

  it("should include a ## Blog section", () => {
    const result = toLlmsTxtMarkdown([]);

    expect(result).toContain("## Blog");
  });

  it("should include an ## Optional section", () => {
    const result = toLlmsTxtMarkdown([]);

    expect(result).toContain("## Optional");
  });

  it("should link to /index.md, /about.md and /uses.md under ## Pages", () => {
    const result = toLlmsTxtMarkdown([]);
    const pagesSection = result.split("## Pages")[1].split("##")[0];

    expect(pagesSection).toContain("https://jimmy.codes/index.md");
    expect(pagesSection).toContain("https://jimmy.codes/about.md");
    expect(pagesSection).toContain("https://jimmy.codes/uses.md");
  });

  it("should link to /blog.md under ## Blog", () => {
    const result = toLlmsTxtMarkdown([]);
    const blogSection = result.split("## Blog")[1].split("##")[0];

    expect(blogSection).toContain("https://jimmy.codes/blog.md");
  });

  it("should link to /blog/tags.md and the RSS feed under ## Optional", () => {
    const result = toLlmsTxtMarkdown([]);
    const optionalSection = result.split("## Optional")[1];

    expect(optionalSection).toContain("https://jimmy.codes/blog/tags.md");
    expect(optionalSection).toContain("https://jimmy.codes/blog/rss.xml");
  });

  it("should render each post as a list item linking to /blog/<slug>.md", () => {
    const posts = [makePost("my-post", "My Post", new Date("2024-01-01"))];
    const result = toLlmsTxtMarkdown(posts);

    expect(result).toContain(
      "- [My Post](https://jimmy.codes/blog/my-post.md)",
    );
  });

  it("should append the post description after the link", () => {
    const posts = [
      makePost("my-post", "My Post", new Date("2024-01-01"), "Great article."),
    ];
    const result = toLlmsTxtMarkdown(posts);

    expect(result).toContain(
      "- [My Post](https://jimmy.codes/blog/my-post.md): Great article.",
    );
  });

  it("should sort posts newest first", () => {
    const posts = [
      makePost("older", "Older Post", new Date("2023-01-01")),
      makePost("newer", "Newer Post", new Date("2024-06-01")),
    ];
    const result = toLlmsTxtMarkdown(posts);

    expect(result.indexOf("Newer Post")).toBeLessThan(
      result.indexOf("Older Post"),
    );
  });

  it("should not mutate the input posts array order", () => {
    const posts = [
      makePost("older", "Older Post", new Date("2023-01-01")),
      makePost("newer", "Newer Post", new Date("2024-06-01")),
    ];
    toLlmsTxtMarkdown(posts);

    expect(posts[0].id).toBe("older");
    expect(posts[1].id).toBe("newer");
  });

  it("should render an empty blog section when there are no posts", () => {
    const result = toLlmsTxtMarkdown([]);
    const blogSection = result.split("## Blog")[1].split("##")[0];

    // Only the blog.md index link — no post rows
    expect(blogSection.trim()).toBe(
      "- [Blog](https://jimmy.codes/blog.md): Full list of all posts",
    );
  });
});
