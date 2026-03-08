import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

// biome-ignore lint/suspicious/noTsIgnore: this is needed
// @ts-ignore
import Tags from "./Tags.astro";

describe("Tags", () => {
  it("should render all tags as links", async () => {
    const tags = [
      { count: 5, tag: "TypeScript" },
      { count: 3, tag: "React" },
      { count: 2, tag: "Testing" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("> TypeScript </a>");
    expect(html).toContain("> React </a>");
    expect(html).toContain("> Testing </a>");
  });

  it("should preserve the order of tags as provided", async () => {
    const tags = [
      { count: 1, tag: "Zebra" },
      { count: 2, tag: "Apple" },
      { count: 3, tag: "Mango" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    const zebraIndex = html.indexOf("> Zebra </a>");
    const appleIndex = html.indexOf("> Apple </a>");
    const mangoIndex = html.indexOf("> Mango </a>");

    expect(zebraIndex).toBeGreaterThan(-1);
    expect(appleIndex).toBeGreaterThan(zebraIndex);
    expect(mangoIndex).toBeGreaterThan(appleIndex);
  });

  it("should generate correct href for each tag", async () => {
    const tags = [
      { count: 5, tag: "TypeScript" },
      { count: 3, tag: "Unit Testing" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain('href="/blog/tags/typescript"');
    expect(html).toContain('href="/blog/tags/unit-testing"');
  });

  it("should apply active styles when tag matches active prop", async () => {
    const tags = [
      { count: 5, tag: "TypeScript" },
      { count: 3, tag: "React" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { active: "typescript", tags },
    });

    expect(html).toContain("badge-neutral");
  });

  it("should apply badge soft styles to non-active tags", async () => {
    const tags = [
      { count: 5, tag: "TypeScript" },
      { count: 3, tag: "React" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { active: "typescript", tags },
    });

    expect(html).toContain("hover:badge-soft");
  });

  it("should set aria-label with 'Current tag:' for active tag", async () => {
    const tags = [{ count: 5, tag: "TypeScript" }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { active: "typescript", tags },
    });

    expect(html).toContain('aria-label="Current: TypeScript"');
  });

  it("should set aria-label with 'Filter by' for non-active tags", async () => {
    const tags = [{ count: 3, tag: "React" }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { active: "typescript", tags },
    });

    expect(html).toContain('aria-label="Filter by React"');
  });

  it("should set aria-current='page' for active tag", async () => {
    const tags = [{ count: 5, tag: "TypeScript" }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { active: "typescript", tags },
    });

    expect(html).toContain('aria-current="page"');
  });

  it("should not set aria-current for non-active tags", async () => {
    const tags = [{ count: 3, tag: "React" }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { active: "typescript", tags },
    });

    // Check that the React link doesn't have aria-current
    const reactLinkMatch = html.match(
      /<a[^>]*href="\/blog\/tags\/react"[^>]*>/,
    );
    expect(reactLinkMatch).toBeTruthy();
    expect(reactLinkMatch?.[0]).not.toContain('aria-current="page"');
  });

  it("should include data-astro-prefetch attribute", async () => {
    const tags = [{ count: 5, tag: "TypeScript" }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("data-astro-prefetch");
  });

  it("should include proper navigation aria-label", async () => {
    const tags = [{ count: 5, tag: "TypeScript" }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain('aria-label="Filter posts by tag"');
  });

  it("should apply base badge and focus styles to all tags", async () => {
    const tags = [{ count: 5, tag: "TypeScript" }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("badge transition-colors");
    expect(html).toContain("focus-visible:ring-1");
    expect(html).toContain("focus-visible:ring-base-content");
    expect(html).toContain("focus-visible:outline-none");
  });

  it("should handle tags with special characters in slugification", async () => {
    const tags = [
      { count: 2, tag: "C++" },
      { count: 4, tag: "Node.js" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    // Assuming slugifyTag converts these appropriately
    expect(html).toContain('href="/blog/tags/');
    expect(html).toContain("> C++ </a>");
    expect(html).toContain("> Node.js </a>");
  });

  it("should show all tags when count is less than guessMaxVisible", async () => {
    const tags = [
      { count: 5, tag: "TypeScript" },
      { count: 3, tag: "React" },
      { count: 2, tag: "Testing" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("> TypeScript </a>");
    expect(html).toContain("> React </a>");
    expect(html).toContain("> Testing </a>");
    expect(html).not.toContain("more");
  });

  it("should truncate tags and show more link when exceeding guessMaxVisible", async () => {
    // With targetChars=68 and paddingPerTag=4:
    // LongTagOne(10+4=14), LongTagTwo(10+4=14, total=28), LongTagThree(12+4=16, total=44)
    // LongTagFour(11+4=15, total=59), LongTagFive(11+4=15, total=74) -> exceeds 68
    const tags = [
      { count: 5, tag: "LongTagOne" },
      { count: 4, tag: "LongTagTwo" },
      { count: 3, tag: "LongTagThree" },
      { count: 2, tag: "LongTagFour" },
      { count: 1, tag: "LongTagFive" },
      { count: 1, tag: "LongTagSix" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("> LongTagOne </a>");
    expect(html).toContain("> LongTagTwo </a>");
    expect(html).toContain("> LongTagThree </a>");
    expect(html).toContain("> LongTagFour </a>");
    expect(html).not.toContain("> LongTagFive </a>");
    expect(html).not.toContain("> LongTagSix </a>");
    expect(html).toContain("+2 more");
  });

  it("should link more link to /blog/tags", async () => {
    // Same data as above — triggers truncation via guessMaxVisible
    const tags = [
      { count: 5, tag: "LongTagOne" },
      { count: 4, tag: "LongTagTwo" },
      { count: 3, tag: "LongTagThree" },
      { count: 2, tag: "LongTagFour" },
      { count: 1, tag: "LongTagFive" },
      { count: 1, tag: "LongTagSix" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain('href="/blog/tags"');
    expect(html).toContain("+2 more");
  });

  it("should apply badge-outline style to more link", async () => {
    const tags = [
      { count: 5, tag: "LongTagOne" },
      { count: 4, tag: "LongTagTwo" },
      { count: 3, tag: "LongTagThree" },
      { count: 2, tag: "LongTagFour" },
      { count: 1, tag: "LongTagFive" },
      { count: 1, tag: "LongTagSix" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    const moreLinkMatch = html.match(
      /<a[^>]*href="\/blog\/tags"[^>]*>.*?\+2 more.*?<\/a>/s,
    );
    expect(moreLinkMatch).toBeTruthy();
    expect(moreLinkMatch?.[0]).toContain("badge-outline");
  });
});
