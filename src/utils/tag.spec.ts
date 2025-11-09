import { describe, expect, it } from "vitest";

import { getAllTags, slugifyTag } from "./tag";

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
