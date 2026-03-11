import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { getRelatedByTags } from "./related";

type Post = Parameters<typeof getRelatedByTags>[0][number];

const makePost = (overrides: { id: string; data?: Partial<Post["data"]> }) => {
  const base = {
    data: {
      description: "Desc",
      keywords: [],
      publishDate: new Date("2024-01-01T00:00:00Z"),
      tags: [],
      title: "Title",
      updatedDate: undefined,
    },
    id: "base",
  };

  return {
    data: { ...base.data, ...(overrides.data ?? {}) },
    id: overrides.id,
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
    const current = makePost({ data: { tags: ["TIL"] }, id: "a" });
    const all = [
      current,
      makePost({ data: { tags: ["TIL", "React"] }, id: "b" }),
      makePost({ data: { tags: ["TIL", "TypeScript"] }, id: "c" }),
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["TIL"] });

    expect(results).toEqual([]);
  });

  it("should skip candidates that have zero usable tags", () => {
    const current = makePost({ data: { tags: ["React"] }, id: "a" });
    const all = [
      current,
      makePost({ data: { tags: [] }, id: "b" }),
      makePost({ data: { tags: ["TIL"] }, id: "c" }),
      makePost({ data: { tags: ["React"] }, id: "d" }),
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["TIL"] });

    expect(results.map((r) => r.slug)).toEqual(["d"]);
  });

  it("should give zero weight to unseen/filtered tags (no accidental boost)", () => {
    const current = makePost({ data: { tags: ["React"] }, id: "a" });
    // "unknown" never appears in tagCounts because it is stopped everywhere
    const all = [
      current,
      makePost({ data: { tags: ["React", "Tooling"] }, id: "b" }),
      makePost({ data: { tags: ["Tooling"] }, id: "c" }),
      makePost({ data: { tags: ["React"] }, id: "d" }),
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["Tooling"] });

    // b and d both share only "react"; unknown contributes zero
    expect(results.map((r) => r.slug)).toEqual(["b", "d"]);
  });

  it("should honor minimumSharedTags", () => {
    const current = makePost({
      data: { tags: ["React", "Node.js"] },
      id: "a",
    });
    const all = [
      current,
      makePost({ data: { tags: ["React"] }, id: "b" }),
      makePost({ data: { tags: ["Node.js"] }, id: "c" }),
      makePost({ data: { tags: ["React", "Node.js"] }, id: "d" }),
    ];
    const results = getRelatedByTags(all, current, { minimumSharedTags: 2 });

    expect(results.map((r) => r.slug)).toEqual(["d"]);
  });

  it("should break ties deterministically by title then slug", () => {
    const date = new Date("2024-01-01T00:00:00Z");
    const current = makePost({ data: { tags: ["React"] }, id: "a" });

    // Same score and date — title tie falls through to slug tiebreaker
    const b = makePost({
      data: { publishDate: date, tags: ["React"], title: "Same" },
      id: "b",
    });
    const c = makePost({
      data: { publishDate: date, tags: ["React"], title: "Same" },
      id: "c",
    });

    const all = [current, b, c];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["b", "c"]); // slug ascending
  });

  it("should prefer newer publishDate when scores are equal", () => {
    const current = makePost({ data: { tags: ["React"] }, id: "a" });
    const older = makePost({
      data: { publishDate: new Date("2023-01-01T00:00:00Z"), tags: ["React"] },
      id: "older",
    });
    const newer = makePost({
      data: { publishDate: new Date("2024-01-01T00:00:00Z"), tags: ["React"] },
      id: "newer",
    });

    const all = [current, older, newer];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["newer", "older"]);
  });

  it("should apply a subtle recency bias when recencyWeight is set", () => {
    const current = makePost({ data: { tags: ["React"] }, id: "a" });

    // Same tags, different ages. With weight, newer should rank first even if dates are close.
    const lessRecent = makePost({
      data: { publishDate: new Date("2024-01-01T00:00:00Z"), tags: ["React"] },
      id: "less-recent",
    });
    const moreRecent = makePost({
      data: { publishDate: new Date("2024-12-01T00:00:00Z"), tags: ["React"] },
      id: "more-recent",
    });

    const all = [current, lessRecent, moreRecent];

    const withoutBias = getRelatedByTags(all, current);
    expect(withoutBias.map((r) => r.slug)).toEqual([
      "more-recent",
      "less-recent",
    ]);

    const withBias = getRelatedByTags(all, current, { recencyWeight: 0.03 });

    expect(withBias.map((r) => r.slug)).toEqual(["more-recent", "less-recent"]);
  });

  it("should cap results by the limit", () => {
    const current = makePost({ data: { tags: ["React"] }, id: "a" });
    const all = [
      current,
      makePost({ data: { tags: ["React"] }, id: "b" }),
      makePost({ data: { tags: ["React"] }, id: "c" }),
      makePost({ data: { tags: ["React"] }, id: "d" }),
    ];
    const results = getRelatedByTags(all, current, { limit: 2 });

    expect(results).toHaveLength(2);
  });

  it("should break ties deterministically with different titles", () => {
    const date = new Date("2024-01-01T00:00:00Z");
    const current = makePost({ data: { tags: ["React"] }, id: "a" });

    // Same score and date, different titles
    const zebra = makePost({
      data: { publishDate: date, tags: ["React"], title: "Zebra Title" },
      id: "zebra-slug",
    });
    const alpha = makePost({
      data: { publishDate: date, tags: ["React"], title: "Alpha Title" },
      id: "alpha-slug",
    });

    const all = [current, zebra, alpha];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["alpha-slug", "zebra-slug"]);
  });

  it("should prefer `heading` over `title` when available", () => {
    const current = makePost({ data: { tags: ["React"] }, id: "current" });

    const related = makePost({
      data: {
        shortTitle: "Preferred Heading",
        tags: ["React"],
        title: "Fallback Title",
      },
      id: "candidate",
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
    const current = makePost({ data: { tags: ["React"] }, id: "current" });

    const related = makePost({
      data: {
        tags: ["React"],
        title: "Only Title",
      },
      id: "candidate",
    });

    const all = [current, related];

    const results = getRelatedByTags(all, current);

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      slug: "candidate",
      title: "Only Title",
    });
  });

  it("should rank a post with perfect tag overlap above one with incidental single-tag overlap", () => {
    const date = new Date("2024-01-01T00:00:00Z");

    // current: React + TypeScript
    const current = makePost({
      data: { publishDate: date, tags: ["React", "TypeScript"] },
      id: "current",
    });

    // perfect: shares both React + TypeScript — jaccard = 2/2 = 1.0
    const perfect = makePost({
      data: { publishDate: date, tags: ["React", "TypeScript"] },
      id: "perfect",
    });

    // incidental: shares only React but has many unrelated tags — jaccard = 1/5 = 0.2
    const incidental = makePost({
      data: {
        publishDate: date,
        tags: ["React", "Node.js", "Tailwind", "CSS", "Performance"],
      },
      id: "incidental",
    });

    const all = [current, perfect, incidental];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["perfect", "incidental"]);
  });

  it("should produce equal scores when all candidates have the same jaccard (jaccardWeight parity)", () => {
    const date = new Date("2024-01-01T00:00:00Z");

    const current = makePost({
      data: { publishDate: date, tags: ["TypeScript"] },
      id: "current",
    });

    // both candidates share the single tag with the same jaccard = 1/1 = 1.0
    const a = makePost({
      data: { publishDate: date, tags: ["TypeScript"], title: "A Post" },
      id: "a-post",
    });
    const b = makePost({
      data: { publishDate: date, tags: ["TypeScript"], title: "B Post" },
      id: "b-post",
    });

    const all = [current, a, b];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["a-post", "b-post"]);
  });

  it("should disable Jaccard blending when jaccardWeight is 0", () => {
    const date = new Date("2024-01-01T00:00:00Z");

    const current = makePost({
      data: { publishDate: date, tags: ["React", "TypeScript"] },
      id: "current",
    });

    // With jaccardWeight=0, scores are pure IDF. Both share React; neither gets a
    // Jaccard boost, so the one with more shared tags (also has TypeScript) wins purely on IDF.
    const twoShared = makePost({
      data: {
        publishDate: date,
        tags: ["React", "TypeScript", "Node.js", "Tailwind"],
      },
      id: "two-shared",
    });
    const oneShared = makePost({
      data: { publishDate: date, tags: ["React"] },
      id: "one-shared",
    });

    const all = [current, twoShared, oneShared];

    const withoutJaccard = getRelatedByTags(all, current, { jaccardWeight: 0 });
    const withJaccard = getRelatedByTags(all, current, { jaccardWeight: 0.5 });

    // Both orderings rank two-shared first because it has a higher IDF score (two
    // shared tags vs one). With jaccardWeight=0.5, both candidates happen to have
    // the same Jaccard value (two-shared: 2/4=0.5, one-shared: 1/2=0.5), so the
    // Jaccard boost is equal and the IDF advantage still determines the order.
    expect(withoutJaccard.map((r) => r.slug)).toEqual([
      "two-shared",
      "one-shared",
    ]);
    expect(withJaccard.map((r) => r.slug)).toEqual([
      "two-shared",
      "one-shared",
    ]);
  });
});
