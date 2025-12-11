import { describe, expect, it } from "vitest";
import { shortTitle } from "./post";

describe("shortTitle", () => {
  it("returns the short title if available", () => {
    const post = {
      data: {
        description: "Post description",
        keywords: ["astro", "rehype-autolink-headings"],
        publishDate: new Date("2024-01-01"),
        shortTitle: "Short Title",
        tags: ["Astro" as const, "Markdown" as const],
        title: "Long Title",
      },
      slug: "example-slug",
    };

    expect(shortTitle(post)).toBe("Short Title");
  });

  it("returns the title if short title is not available", () => {
    const post = {
      data: {
        description: "Post description",
        keywords: ["astro", "rehype-autolink-headings"],
        publishDate: new Date("2024-01-01"),
        tags: ["Astro" as const, "Markdown" as const],
        title: "Long Title",
      },
      slug: "example-slug",
    };

    expect(shortTitle(post)).toBe("Long Title");
  });
});
