import { describe, expect, it } from "vitest";
import { shortTitle } from "./post";

describe("shortTitle", () => {
  it("returns the short title if available", () => {
    const post = {
      data: {
        shortTitle: "Short Title",
        title: "Long Title",
        description: "Post description",
        publishDate: new Date("2024-01-01"),
        keywords: ["astro", "rehype-autolink-headings"],
        tags: ["Astro" as const, "Markdown" as const],
      },
      slug: "example-slug",
    };

    expect(shortTitle(post)).toBe("Short Title");
  });

  it("returns the title if short title is not available", () => {
    const post = {
      data: {
        title: "Long Title",
        description: "Post description",
        publishDate: new Date("2024-01-01"),
        keywords: ["astro", "rehype-autolink-headings"],
        tags: ["Astro" as const, "Markdown" as const],
      },
      slug: "example-slug",
    };

    expect(shortTitle(post)).toBe("Long Title");
  });
});
