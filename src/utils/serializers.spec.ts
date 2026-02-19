import { describe, expect, it } from "vitest";
import { toRawMarkdown } from "./serializers";

describe("toRawMarkdown", () => {
  it("should wrap content in frontmatter delimiters", () => {
    const result = toRawMarkdown({
      body: "Body text",
      data: { title: "Hello" },
    });

    expect(result).toMatch(/^---\n/);
    expect(result).toContain("\n---\n\nBody text");
  });

  it("should output string values as-is", () => {
    const result = toRawMarkdown({
      body: "",
      data: { title: "My Post" },
    });

    expect(result).toContain("title: My Post");
  });

  it("should format Date values as YYYY-MM-DD", () => {
    const result = toRawMarkdown({
      body: "",
      data: { date: new Date("2024-03-15T12:00:00Z") },
    });

    expect(result).toContain("date: 2024-03-15");
    expect(result).not.toContain("T12:00");
  });

  it("should serialize array values as JSON", () => {
    const result = toRawMarkdown({
      body: "",
      data: { tags: ["a", "b"] },
    });

    expect(result).toContain('tags: ["a","b"]');
  });

  it("should handle multiple frontmatter fields", () => {
    const result = toRawMarkdown({
      body: "",
      data: { draft: true, tags: ["x"], title: "Post" },
    });

    expect(result).toContain("title: Post");
    expect(result).toContain("draft: true");
    expect(result).toContain('tags: ["x"]');
  });

  it("should handle an empty body", () => {
    const result = toRawMarkdown({
      body: "",
      data: { title: "No Body" },
    });

    expect(result).toBe("---\ntitle: No Body\n---\n\n");
  });
});
