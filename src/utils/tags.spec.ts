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
      { count: 2, tag: "react" },
      { count: 1, tag: "design" },
      { count: 1, tag: "node" },
      { count: 1, tag: "typescript" },
    ]);
  });

  it("should sort by frequency with most popular first", () => {
    const posts = [
      { data: { tags: ["a", "b"] } },
      { data: { tags: ["c", "b", "a"] } },
      { data: { tags: ["b"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { count: 3, tag: "b" },
      { count: 2, tag: "a" },
      { count: 1, tag: "c" },
    ]);
  });

  it("should sort alphabetically when tags have the same count", () => {
    const posts = [{ data: { tags: ["zebra", "apple", "banana"] } }];

    expect(getAllTags(posts)).toEqual([
      { count: 1, tag: "apple" },
      { count: 1, tag: "banana" },
      { count: 1, tag: "zebra" },
    ]);
  });

  it("should count duplicate tags within a single post only once", () => {
    const posts = [
      { data: { tags: ["react", "react", "node"] } },
      { data: { tags: ["react"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      { count: 2, tag: "react" },
      { count: 1, tag: "node" },
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
      { count: 1, tag: "React Router" },
      { count: 1, tag: "TypeScript" },
    ]);
  });
});

describe("guessMaxVisible", () => {
  it("should return all tags when total characters are under the target", () => {
    const tags = [
      { count: 2, tag: "CSS" },
      { count: 1, tag: "CLI" },
      { count: 1, tag: "A11y" },
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should cut off when character count exceeds target", () => {
    const tags = [
      { count: 3, tag: "Frontend" },
      { count: 3, tag: "TypeScript" },
      { count: 2, tag: "Astro" },
      { count: 2, tag: "CSS" },
      { count: 2, tag: "Markdown" },
      { count: 2, tag: "Node.js" },
      { count: 1, tag: "A11y" },
      { count: 1, tag: "Analytics" },
    ];

    // With targetChars=80 (40 chars/line × 2 lines) and padding=4 per tag:
    // Frontend(8+4=12), TypeScript(10+4=14, total=26), Astro(5+4=9, total=35)
    // CSS(3+4=7, total=42), Markdown(8+4=12, total=54), Node.js(7+4=11, total=65)
    // A11y(4+4=8, total=73), Analytics(9+4=13, total=86) -> exceeds 80!
    expect(guessMaxVisible(tags)).toBe(7);
  });

  it("should return minimum of 3 even with very long tag names", () => {
    const tags = [
      { count: 1, tag: "VeryLongTagNameThatExceedsTargetImmediately" },
      { count: 1, tag: "AnotherLongOne" },
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should return minimum of 3 with empty array", () => {
    expect(guessMaxVisible([])).toBe(3);
  });

  it("should return minimum of 3 with single tag", () => {
    const tags = [{ count: 5, tag: "React" }];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should account for padding in character calculation", () => {
    const tags = [
      { count: 1, tag: "A" }, // 1+4=5
      { count: 1, tag: "B" }, // 1+4=5, total=10
      { count: 1, tag: "C" }, // 1+4=5, total=15
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should handle tags with special characters and spaces", () => {
    const tags = [
      { count: 1, tag: "Next.js" },
      { count: 1, tag: "CI/CD" },
      { count: 1, tag: "Node.js" },
    ];

    expect(guessMaxVisible(tags)).toBe(3);
  });

  it("should break at the correct position with mixed tag lengths", () => {
    const tags = [
      { count: 1, tag: "A" }, // 5
      { count: 1, tag: "BB" }, // 6, total=11
      { count: 1, tag: "CCC" }, // 7, total=18
      { count: 1, tag: "DDDD" }, // 8, total=26
      { count: 1, tag: "EEEEE" }, // 9, total=35
      { count: 1, tag: "FFFFFF" }, // 10, total=45
      { count: 1, tag: "GGGGGGG" }, // 11, total=56
      { count: 1, tag: "HHHHHHHH" }, // 12, total=68
      { count: 1, tag: "IIIIIIIII" }, // 13, total=81 -> exceeds 80
    ];

    expect(guessMaxVisible(tags)).toBe(8);
  });
});
