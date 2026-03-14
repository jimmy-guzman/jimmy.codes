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
