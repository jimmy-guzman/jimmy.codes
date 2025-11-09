import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

// biome-ignore lint/suspicious/noTsIgnore: this is needed
// @ts-ignore
import Tags from "./Tags.astro";

describe("Tags", () => {
  it("should render all tags as links", async () => {
    const tags = [
      { tag: "TypeScript", count: 5 },
      { tag: "React", count: 3 },
      { tag: "Testing", count: 2 },
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
      { tag: "Zebra", count: 1 },
      { tag: "Apple", count: 2 },
      { tag: "Mango", count: 3 },
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
      { tag: "TypeScript", count: 5 },
      { tag: "Unit Testing", count: 3 },
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
      { tag: "TypeScript", count: 5 },
      { tag: "React", count: 3 },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain("badge-primary");
  });

  it("should apply badge soft styles to non-active tags", async () => {
    const tags = [
      { tag: "TypeScript", count: 5 },
      { tag: "React", count: 3 },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain("hover:badge-soft");
  });

  it("should set aria-label with 'Current tag:' for active tag", async () => {
    const tags = [{ tag: "TypeScript", count: 5 }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain('aria-label="Current: TypeScript"');
  });

  it("should set aria-label with 'Filter by' for non-active tags", async () => {
    const tags = [{ tag: "React", count: 3 }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain('aria-label="Filter by React"');
  });

  it("should set aria-current='page' for active tag", async () => {
    const tags = [{ tag: "TypeScript", count: 5 }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain('aria-current="page"');
  });

  it("should not set aria-current for non-active tags", async () => {
    const tags = [{ tag: "React", count: 3 }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    // Check that the React link doesn't have aria-current
    const reactLinkMatch = html.match(
      /<a[^>]*href="\/blog\/tags\/react"[^>]*>/,
    );
    expect(reactLinkMatch).toBeTruthy();
    expect(reactLinkMatch?.[0]).not.toContain('aria-current="page"');
  });

  it("should include data-astro-prefetch attribute", async () => {
    const tags = [{ tag: "TypeScript", count: 5 }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("data-astro-prefetch");
  });

  it("should include proper navigation aria-label", async () => {
    const tags = [{ tag: "TypeScript", count: 5 }];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain('aria-label="Filter posts by tag"');
  });

  it("should apply base badge and focus styles to all tags", async () => {
    const tags = [{ tag: "TypeScript", count: 5 }];

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
      { tag: "C++", count: 2 },
      { tag: "Node.js", count: 4 },
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
      { tag: "TypeScript", count: 5 },
      { tag: "React", count: 3 },
      { tag: "Testing", count: 2 },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, maxVisible: 5 },
    });

    expect(html).toContain("> TypeScript </a>");
    expect(html).toContain("> React </a>");
    expect(html).toContain("> Testing </a>");
    expect(html).not.toContain("more");
  });

  it("should truncate tags and show more link when exceeding maxVisible", async () => {
    const tags = [
      { tag: "TypeScript", count: 10 },
      { tag: "React", count: 8 },
      { tag: "Testing", count: 6 },
      { tag: "Node.js", count: 5 },
      { tag: "Python", count: 4 },
      { tag: "Go", count: 3 },
    ];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, maxVisible: 3 },
    });

    expect(html).toContain("> TypeScript </a>");
    expect(html).toContain("> React </a>");
    expect(html).toContain("> Testing </a>");
    expect(html).not.toContain("> Node.js </a>");
    expect(html).not.toContain("> Python </a>");
    expect(html).not.toContain("> Go </a>");
    expect(html).toContain("+3 more");
  });

  it("should use default maxVisible of 7 when not provided", async () => {
    const tags = Array.from({ length: 10 }, (_, i) => ({
      tag: `Tag${i + 1}`,
      count: 10 - i,
    }));

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("> Tag1 </a>");
    expect(html).toContain("> Tag7 </a>");
    expect(html).not.toContain("> Tag8 </a>");
    expect(html).toContain("+3 more");
  });

  it("should link more link to /blog/tags", async () => {
    const tags = Array.from({ length: 10 }, (_, i) => ({
      tag: `Tag${i + 1}`,
      count: 10 - i,
    }));

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, maxVisible: 5 },
    });

    expect(html).toContain('href="/blog/tags"');
    expect(html).toContain("+5 more");
  });

  it("should apply badge-outline style to more link", async () => {
    const tags = Array.from({ length: 10 }, (_, i) => ({
      tag: `Tag${i + 1}`,
      count: 10 - i,
    }));

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, maxVisible: 5 },
    });

    const moreLinkMatch = html.match(
      /<a[^>]*href="\/blog\/tags"[^>]*>.*?\+5 more.*?<\/a>/s,
    );
    expect(moreLinkMatch).toBeTruthy();
    expect(moreLinkMatch?.[0]).toContain("badge-outline");
  });
});
