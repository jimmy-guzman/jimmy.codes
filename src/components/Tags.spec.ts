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

    expect(html).toContain("badge-primary");
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

  it("should show all tags when count is less than maxVisible", async () => {
    const tags = [
      { count: 5, tag: "TypeScript" },
      { count: 3, tag: "React" },
      { count: 2, tag: "Testing" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { maxVisible: 5, tags },
    });

    expect(html).toContain("> TypeScript </a>");
    expect(html).toContain("> React </a>");
    expect(html).toContain("> Testing </a>");
    expect(html).not.toContain("more");
  });

  it("should truncate tags and show more link when exceeding maxVisible", async () => {
    const tags = [
      { count: 10, tag: "TypeScript" },
      { count: 8, tag: "React" },
      { count: 6, tag: "Testing" },
      { count: 5, tag: "Node.js" },
      { count: 4, tag: "Python" },
      { count: 3, tag: "Go" },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { maxVisible: 3, tags },
    });

    expect(html).toContain("> TypeScript </a>");
    expect(html).toContain("> React </a>");
    expect(html).toContain("> Testing </a>");
    expect(html).not.toContain("> Node.js </a>");
    expect(html).not.toContain("> Python </a>");
    expect(html).not.toContain("> Go </a>");
    expect(html).toContain("+3 more");
  });

  it("should link more link to /blog/tags", async () => {
    const tags = Array.from({ length: 10 }, (_, i) => ({
      count: 10 - i,
      tag: `Tag${i + 1}`,
    }));

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { maxVisible: 5, tags },
    });

    expect(html).toContain('href="/blog/tags"');
    expect(html).toContain("+5 more");
  });

  it("should apply badge-outline style to more link", async () => {
    const tags = Array.from({ length: 10 }, (_, i) => ({
      count: 10 - i,
      tag: `Tag${i + 1}`,
    }));

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { maxVisible: 5, tags },
    });

    const moreLinkMatch = html.match(
      /<a[^>]*href="\/blog\/tags"[^>]*>.*?\+5 more.*?<\/a>/s,
    );
    expect(moreLinkMatch).toBeTruthy();
    expect(moreLinkMatch?.[0]).toContain("badge-outline");
  });
});
