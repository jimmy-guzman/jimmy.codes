import { describe, expect, it } from "vitest";

import { getAllTags, guessMaxVisible, slugifyTag } from "./tags";

describe("slugifyTag", () => {
  it("should lowercase the input", () => {
    expect(slugifyTag("ReAcT")).toBe("react");
  });

  it("should replace spaces with a single hyphen", () => {
    expect(slugifyTag("React Router")).toBe("react-router");
  });

  it("should replace slashes with a single hyphen", () => {
    expect(slugifyTag("react/router")).toBe("react-router");
  });

  it("should collapse consecutive spaces and slashes to a single hyphen", () => {
    expect(slugifyTag("react   ///   router")).toBe("react-router");
  });

  it("should preserve leading/trailing separators based on input (no trim)", () => {
    expect(slugifyTag("  TypeScript  ")).toBe("-typescript-");
  });

  it("should keep existing hyphens intact", () => {
    expect(slugifyTag("node-js")).toBe("node-js");
  });

  it("should handle unicode letters", () => {
    expect(slugifyTag("Café Crème")).toBe("café-crème");
  });
});

describe("getAllTags", () => {
  it("should return tags sorted by popularity (descending), then alphabetically", () => {
    const posts = [
      { data: { tags: ["react", "typescript"] } },
      { data: { tags: ["react", "node"] } },
      { data: { tags: ["design"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { tag: "react", count: 2 },
      { tag: "design", count: 1 },
      { tag: "node", count: 1 },
      { tag: "typescript", count: 1 },
    ]);
  });

  it("should sort by frequency with most popular first", () => {
    const posts = [
      { data: { tags: ["a", "b"] } },
      { data: { tags: ["c", "b", "a"] } },
      { data: { tags: ["b"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { tag: "b", count: 3 },
      { tag: "a", count: 2 },
      { tag: "c", count: 1 },
    ]);
  });

  it("should sort alphabetically when tags have the same count", () => {
    const posts = [{ data: { tags: ["zebra", "apple", "banana"] } }];

    expect(getAllTags(posts)).toEqual([
      { tag: "apple", count: 1 },
      { tag: "banana", count: 1 },
      { tag: "zebra", count: 1 },
    ]);
  });

  it("should count duplicate tags within a single post only once", () => {
    const posts = [
      { data: { tags: ["react", "react", "node"] } },
      { data: { tags: ["react"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { tag: "react", count: 2 },
      { tag: "node", count: 1 },
    ]);
  });

  it("should ignore posts without tags", () => {
    const posts = [
      { data: {} },
      { data: { tags: undefined } },
      { data: { tags: [] } },
    ];

    expect(getAllTags(posts)).toEqual([]);
  });

  it("should not transform tag values (no slugify/case-change)", () => {
    const posts = [
      { data: { tags: ["React Router"] } },
      { data: { tags: ["TypeScript"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { tag: "React Router", count: 1 },
      { tag: "TypeScript", count: 1 },
    ]);
  });
});

describe("guessMaxVisible", () => {
  it("should return all tags when total characters are under the target", () => {
    const tags = [
      { tag: "CSS", count: 2 },
      { tag: "CLI", count: 1 },
      { tag: "A11y", count: 1 },
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should cut off when character count exceeds target", () => {
    const tags = [
      { tag: "Frontend", count: 3 },
      { tag: "TypeScript", count: 3 },
      { tag: "Astro", count: 2 },
      { tag: "CSS", count: 2 },
      { tag: "Markdown", count: 2 },
      { tag: "Node.js", count: 2 },
      { tag: "A11y", count: 1 },
      { tag: "Analytics", count: 1 },
    ];

    // With targetChars=80 (40 chars/line × 2 lines) and padding=4 per tag:
    // Frontend(8+4=12), TypeScript(10+4=14, total=26), Astro(5+4=9, total=35)
    // CSS(3+4=7, total=42), Markdown(8+4=12, total=54), Node.js(7+4=11, total=65)
    // A11y(4+4=8, total=73), Analytics(9+4=13, total=86) -> exceeds 80!
    expect(guessMaxVisible(tags)).toBe(7);
  });

  it("should return minimum of 3 even with very long tag names", () => {
    const tags = [
      { tag: "VeryLongTagNameThatExceedsTargetImmediately", count: 1 },
      { tag: "AnotherLongOne", count: 1 },
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should return minimum of 3 with empty array", () => {
    expect(guessMaxVisible([])).toBe(3);
  });

  it("should return minimum of 3 with single tag", () => {
    const tags = [{ tag: "React", count: 5 }];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should account for padding in character calculation", () => {
    const tags = [
      { tag: "A", count: 1 }, // 1+4=5
      { tag: "B", count: 1 }, // 1+4=5, total=10
      { tag: "C", count: 1 }, // 1+4=5, total=15
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should handle tags with special characters and spaces", () => {
    const tags = [
      { tag: "Next.js", count: 1 },
      { tag: "CI/CD", count: 1 },
      { tag: "Node.js", count: 1 },
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should break at the correct position with mixed tag lengths", () => {
    const tags = [
      { tag: "A", count: 1 }, // 5
      { tag: "BB", count: 1 }, // 6, total=11
      { tag: "CCC", count: 1 }, // 7, total=18
      { tag: "DDDD", count: 1 }, // 8, total=26
      { tag: "EEEEE", count: 1 }, // 9, total=35
      { tag: "FFFFFF", count: 1 }, // 10, total=45
      { tag: "GGGGGGG", count: 1 }, // 11, total=56
      { tag: "HHHHHHHH", count: 1 }, // 12, total=68
      { tag: "IIIIIIIII", count: 1 }, // 13, total=81 -> exceeds 80
    ];

    expect(guessMaxVisible(tags)).toBe(8);
  });
});
