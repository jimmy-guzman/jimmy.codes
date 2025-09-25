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
  it("should return unique tags across posts", () => {
    const posts = [
      { data: { tags: ["react", "typescript"] } },
      { data: { tags: ["react", "node"] } },
      { data: { tags: ["design"] } },
    ];

    expect(getAllTags(posts)).toEqual([
      "react",
      "typescript",
      "node",
      "design",
    ]);
  });

  it("should preserve first-seen order", () => {
    const posts = [
      { data: { tags: ["b", "a"] } },
      { data: { tags: ["a", "c", "b"] } },
    ];

    expect(getAllTags(posts)).toEqual(["b", "a", "c"]);
  });

  it("should de-duplicate within a single post", () => {
    const posts = [{ data: { tags: ["react", "react", "node"] } }];

    expect(getAllTags(posts)).toEqual(["react", "node"]);
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
    const posts = [{ data: { tags: ["React Router"] } }];

    expect(getAllTags(posts)).toEqual(["React Router"]);
  });
});
