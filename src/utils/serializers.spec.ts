import type { CollectionEntry } from "astro:content";
import { describe, expect, it } from "vitest";
import { toRawMarkdown } from "./serializers";

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

  it("should serialize array values as JSON", () => {
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

    expect(result).toContain('keywords: ["a","b"]');
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
    expect(result).toContain('tags: ["TypeScript"]');
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
});
