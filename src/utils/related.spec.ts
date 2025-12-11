import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { getRelatedByTags } from "./related";

type Post = Parameters<typeof getRelatedByTags>[0][number];

const makePost = (overrides: {
  slug: string;
  data?: Partial<Post["data"]>;
}) => {
  const base = {
    data: {
      description: "Desc",
      keywords: [],
      publishDate: new Date("2024-01-01T00:00:00Z"),
      tags: [],
      title: "Title",
      updatedDate: undefined,
    },
    slug: "base",
  };

  return {
    data: { ...base.data, ...(overrides.data ?? {}) },
    slug: overrides.slug,
  };
};

describe("getRelatedByTags", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should return empty when current post has no usable tags (early exit)", () => {
    const current = makePost({ data: { tags: ["TIL"] }, slug: "a" });
    const all = [
      current,
      makePost({ data: { tags: ["TIL", "React"] }, slug: "b" }),
      makePost({ data: { tags: ["TIL", "JavaScript"] }, slug: "c" }),
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["TIL"] });

    expect(results).toEqual([]);
  });

  it("should skip candidates that have zero usable tags", () => {
    const current = makePost({ data: { tags: ["React"] }, slug: "a" });
    const all = [
      current,
      makePost({ data: { tags: [] }, slug: "b" }), // zero tags
      makePost({ data: { tags: ["TIL"] }, slug: "c" }), // will be stopped
      makePost({ data: { tags: ["React"] }, slug: "d" }), // valid
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["TIL"] });

    expect(results.map((r) => r.slug)).toEqual(["d"]);
  });

  it("should give zero weight to unseen/filtered tags (no accidental boost)", () => {
    const current = makePost({ data: { tags: ["React"] }, slug: "a" });
    // "unknown" never appears in tagCounts because it is stopped everywhere
    const all = [
      current,
      makePost({ data: { tags: ["React", "Tooling"] }, slug: "b" }),
      makePost({ data: { tags: ["Tooling"] }, slug: "c" }),
      makePost({ data: { tags: ["React"] }, slug: "d" }),
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["Tooling"] });

    // b and d both share only "react"; unknown contributes zero
    expect(results.map((r) => r.slug)).toEqual(["b", "d"]);
  });

  it("should honor minimumSharedTags", () => {
    const current = makePost({
      data: { tags: ["React", "Node.js"] },
      slug: "a",
    });
    const all = [
      current,
      makePost({ data: { tags: ["React"] }, slug: "b" }), // 1 shared
      makePost({ data: { tags: ["Node.js"] }, slug: "c" }), // 1 shared
      makePost({ data: { tags: ["React", "Node.js"] }, slug: "d" }), // 2 shared
    ];
    const results = getRelatedByTags(all, current, { minimumSharedTags: 2 });

    expect(results.map((r) => r.slug)).toEqual(["d"]);
  });

  it("should break ties deterministically by title then slug", () => {
    const date = new Date("2024-01-01T00:00:00Z");
    const current = makePost({ data: { tags: ["React"] }, slug: "a" });

    // Same score (share one tag), same date; title tie requires slug tiebreaker
    const b = makePost({
      data: { publishDate: date, tags: ["React"], title: "Same" },
      slug: "b",
    });
    const c = makePost({
      data: { publishDate: date, tags: ["React"], title: "Same" },
      slug: "c",
    });

    const all = [current, b, c];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["b", "c"]); // slug ascending
  });

  it("should prefer newer publishDate when scores are equal", () => {
    const current = makePost({ data: { tags: ["React"] }, slug: "a" });
    const older = makePost({
      data: { publishDate: new Date("2023-01-01T00:00:00Z"), tags: ["React"] },
      slug: "older",
    });
    const newer = makePost({
      data: { publishDate: new Date("2024-01-01T00:00:00Z"), tags: ["React"] },
      slug: "newer",
    });

    const all = [current, older, newer];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["newer", "older"]);
  });

  it("should apply a subtle recency bias when recencyWeight is set", () => {
    const current = makePost({ data: { tags: ["React"] }, slug: "a" });

    // Same tags, different ages. With weight, newer should rank first even if dates are close.
    const lessRecent = makePost({
      data: { publishDate: new Date("2024-01-01T00:00:00Z"), tags: ["React"] },
      slug: "less-recent",
    });
    const moreRecent = makePost({
      data: { publishDate: new Date("2024-12-01T00:00:00Z"), tags: ["React"] },
      slug: "more-recent",
    });

    const all = [current, lessRecent, moreRecent];

    const withoutBias = getRelatedByTags(all, current);
    expect(withoutBias.map((r) => r.slug)).toEqual([
      "more-recent",
      "less-recent",
    ]); // date tiebreaker already favors newer

    const withBias = getRelatedByTags(all, current, { recencyWeight: 0.03 });

    expect(withBias.map((r) => r.slug)).toEqual(["more-recent", "less-recent"]);
  });

  it("should cap results by the limit", () => {
    const current = makePost({ data: { tags: ["React"] }, slug: "a" });
    const all = [
      current,
      makePost({ data: { tags: ["React"] }, slug: "b" }),
      makePost({ data: { tags: ["React"] }, slug: "c" }),
      makePost({ data: { tags: ["React"] }, slug: "d" }),
    ];
    const results = getRelatedByTags(all, current, { limit: 2 });

    expect(results).toHaveLength(2);
  });

  it("should break ties deterministically with different titles", () => {
    const date = new Date("2024-01-01T00:00:00Z");
    const current = makePost({ data: { tags: ["React"] }, slug: "a" });

    // Same score (share one tag), same date, but DIFFERENT titles
    const zebra = makePost({
      data: { publishDate: date, tags: ["React"], title: "Zebra Title" },
      slug: "zebra-slug",
    });
    const alpha = makePost({
      data: { publishDate: date, tags: ["React"], title: "Alpha Title" },
      slug: "alpha-slug",
    });

    const all = [current, zebra, alpha];
    const results = getRelatedByTags(all, current);

    // Should sort by title: "Alpha Title" comes before "Zebra Title"
    expect(results.map((r) => r.slug)).toEqual(["alpha-slug", "zebra-slug"]);
  });

  it("should prefer `heading` over `title` when available", () => {
    const current = makePost({ data: { tags: ["React"] }, slug: "current" });

    const related = makePost({
      data: {
        shortTitle: "Preferred Heading",
        tags: ["React"],
        title: "Fallback Title",
      },
      slug: "candidate",
    });

    const all = [current, related];

    const results = getRelatedByTags(all, current);

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      slug: "candidate",
      title: "Preferred Heading",
    });
  });

  it("should fall back to `title` when `heading` is not provided", () => {
    const current = makePost({ data: { tags: ["React"] }, slug: "current" });

    const related = makePost({
      data: {
        tags: ["React"],
        title: "Only Title",
      },
      slug: "candidate",
    });

    const all = [current, related];

    const results = getRelatedByTags(all, current);

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      slug: "candidate",
      title: "Only Title",
    });
  });
});
