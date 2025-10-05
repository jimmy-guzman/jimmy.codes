import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

// biome-ignore lint/suspicious/noTsIgnore: this is needed
// @ts-ignore
import Tags from "./Tags.astro";

describe("Tags", () => {
  it("should render all tags as links", async () => {
    const tags = ["TypeScript", "React", "Testing"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("> TypeScript </a>");
    expect(html).toContain("> React </a>");
    expect(html).toContain("> Testing </a>");
  });

  it("should sort tags alphabetically", async () => {
    const tags = ["Zebra", "Apple", "Mango"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    const appleIndex = html.indexOf("> Apple </a>");
    const mangoIndex = html.indexOf("> Mango </a>");
    const zebraIndex = html.indexOf("> Zebra </a>");

    expect(appleIndex).toBeLessThan(mangoIndex);
    expect(mangoIndex).toBeLessThan(zebraIndex);
  });

  it("should generate correct href for each tag", async () => {
    const tags = ["TypeScript", "Unit Testing"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain('href="/blog/tags/typescript"');
    expect(html).toContain('href="/blog/tags/unit-testing"');
  });

  it("should apply active styles when tag matches active prop", async () => {
    const tags = ["TypeScript", "React"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain("text-primary-content badge-primary");
  });

  it("should apply outline styles to non-active tags", async () => {
    const tags = ["TypeScript", "React"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain("badge-outline");
    expect(html).toContain("hover:border-base-300");
  });

  it("should set aria-label with 'Current tag:' for active tag", async () => {
    const tags = ["TypeScript"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain('aria-label="Current tag: TypeScript"');
  });

  it("should set aria-label with 'Filter by' for non-active tags", async () => {
    const tags = ["React"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain('aria-label="Filter by React"');
  });

  it("should set aria-current='page' for active tag", async () => {
    const tags = ["TypeScript"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags, active: "typescript" },
    });

    expect(html).toContain('aria-current="page"');
  });

  it("should not set aria-current for non-active tags", async () => {
    const tags = ["React"];

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
    const tags = ["TypeScript"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("data-astro-prefetch");
  });

  it("should include proper navigation aria-label", async () => {
    const tags = ["TypeScript"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain('aria-label="Filter posts by tag"');
  });

  it("should apply base badge and focus styles to all tags", async () => {
    const tags = ["TypeScript"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    expect(html).toContain("badge transition-colors");
    expect(html).toContain("focus-visible:ring-2");
    expect(html).toContain("focus-visible:ring-base-content");
    expect(html).toContain("focus-visible:outline-none");
  });

  it("should handle tags with special characters in slugification", async () => {
    const tags = ["C++", "Node.js"];

    const container = await AstroContainer.create();
    const html = await container.renderToString(Tags, {
      props: { tags },
    });

    // Assuming slugifyTag converts these appropriately
    expect(html).toContain('href="/blog/tags/');
    expect(html).toContain("> C++ </a>");
    expect(html).toContain("> Node.js </a>");
  });
});
