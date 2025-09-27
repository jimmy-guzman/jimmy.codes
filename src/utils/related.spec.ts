import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { getRelatedByTags } from "./related";

type Post = Parameters<typeof getRelatedByTags>[0][number];

const makePost = (overrides: {
  slug: string;
  data?: Partial<Post["data"]>;
}) => {
  const base = {
    slug: "base",
    data: {
      title: "Title",
      description: "Desc",
      publishDate: new Date("2024-01-01T00:00:00Z"),
      updatedDate: undefined,
      keywords: [],
      tags: [],
    },
  };

  return {
    slug: overrides.slug,
    data: { ...base.data, ...(overrides.data ?? {}) },
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
    const current = makePost({ slug: "a", data: { tags: ["til"] } });
    const all = [
      current,
      makePost({ slug: "b", data: { tags: ["til", "react"] } }),
      makePost({ slug: "c", data: { tags: ["til", "js"] } }),
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["til"] });

    expect(results).toEqual([]);
  });

  it("should skip candidates that have zero usable tags", () => {
    const current = makePost({ slug: "a", data: { tags: ["react"] } });
    const all = [
      current,
      makePost({ slug: "b", data: { tags: [] } }), // zero tags
      makePost({ slug: "c", data: { tags: ["til"] } }), // will be stopped
      makePost({ slug: "d", data: { tags: ["react"] } }), // valid
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["til"] });

    expect(results.map((r) => r.slug)).toEqual(["d"]);
  });

  it("should give zero weight to unseen/filtered tags (no accidental boost)", () => {
    const current = makePost({ slug: "a", data: { tags: ["react"] } });
    // "unknown" never appears in tagCounts because it is stopped everywhere
    const all = [
      current,
      makePost({ slug: "b", data: { tags: ["react", "unknown"] } }),
      makePost({ slug: "c", data: { tags: ["unknown"] } }),
      makePost({ slug: "d", data: { tags: ["react"] } }),
    ];
    const results = getRelatedByTags(all, current, { stopTags: ["unknown"] });

    // b and d both share only "react"; unknown contributes zero
    expect(results.map((r) => r.slug)).toEqual(["b", "d"]);
  });

  it("should honor minimumSharedTags", () => {
    const current = makePost({ slug: "a", data: { tags: ["react", "node"] } });
    const all = [
      current,
      makePost({ slug: "b", data: { tags: ["react"] } }), // 1 shared
      makePost({ slug: "c", data: { tags: ["node"] } }), // 1 shared
      makePost({ slug: "d", data: { tags: ["react", "node"] } }), // 2 shared
    ];
    const results = getRelatedByTags(all, current, { minimumSharedTags: 2 });

    expect(results.map((r) => r.slug)).toEqual(["d"]);
  });

  it("should break ties deterministically by title then slug", () => {
    const date = new Date("2024-01-01T00:00:00Z");
    const current = makePost({ slug: "a", data: { tags: ["x"] } });

    // Same score (share one tag), same date; title tie requires slug tiebreaker
    const b = makePost({
      slug: "b",
      data: { title: "Same", publishDate: date, tags: ["x"] },
    });
    const c = makePost({
      slug: "c",
      data: { title: "Same", publishDate: date, tags: ["x"] },
    });

    const all = [current, b, c];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["b", "c"]); // slug ascending
  });

  it("should prefer newer publishDate when scores are equal", () => {
    const current = makePost({ slug: "a", data: { tags: ["x"] } });
    const older = makePost({
      slug: "older",
      data: { tags: ["x"], publishDate: new Date("2023-01-01T00:00:00Z") },
    });
    const newer = makePost({
      slug: "newer",
      data: { tags: ["x"], publishDate: new Date("2024-01-01T00:00:00Z") },
    });

    const all = [current, older, newer];
    const results = getRelatedByTags(all, current);

    expect(results.map((r) => r.slug)).toEqual(["newer", "older"]);
  });

  it("should apply a subtle recency bias when recencyWeight is set", () => {
    const current = makePost({ slug: "a", data: { tags: ["x"] } });

    // Same tags, different ages. With weight, newer should rank first even if dates are close.
    const lessRecent = makePost({
      slug: "less-recent",
      data: { tags: ["x"], publishDate: new Date("2024-01-01T00:00:00Z") },
    });
    const moreRecent = makePost({
      slug: "more-recent",
      data: { tags: ["x"], publishDate: new Date("2024-12-01T00:00:00Z") },
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
    const current = makePost({ slug: "a", data: { tags: ["x"] } });
    const all = [
      current,
      makePost({ slug: "b", data: { tags: ["x"] } }),
      makePost({ slug: "c", data: { tags: ["x"] } }),
      makePost({ slug: "d", data: { tags: ["x"] } }),
    ];
    const results = getRelatedByTags(all, current, { limit: 2 });

    expect(results).toHaveLength(2);
  });
});
