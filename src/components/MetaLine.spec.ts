import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

// biome-ignore lint/suspicious/noTsIgnore: this is needed
// @ts-ignore
import MetaLine from "./MetaLine.astro";

describe("MetaLine", () => {
  it("should render the publish date text and datetime attribute", async () => {
    const publish = new Date("2024-01-05T00:00:00Z");

    const container = await AstroContainer.create();
    const html = await container.renderToString(MetaLine, {
      props: { publishDate: publish },
    });

    expect(html).toContain("Jan 5, 2024");
    expect(html).toContain(`datetime="${publish.toISOString()}"`);
  });

  it("should render minutes when provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MetaLine, {
      props: {
        publishDate: new Date("2024-01-05T00:00:00Z"),
        minutes: 5,
      },
    });

    expect(html).toContain("5 min read");
  });

  it("should render a GitHub link when filePath is provided", async () => {
    const filePath = "posts/hello-world.mdx";
    const container = await AstroContainer.create();
    const html = await container.renderToString(MetaLine, {
      props: {
        publishDate: new Date("2024-01-05T00:00:00Z"),
        filePath,
      },
    });

    const expected = `https://github.com/jimmy-guzman/jimmy.codes/blob/main/${filePath}`;
    expect(html).toContain(`href="${expected}"`);
    expect(html).toContain('data-tip="View on GitHub"');
    expect(html).toContain(">View on GitHub</span>");
    expect(html).toContain("icon-[lucide--github]");
  });

  it("should not render a GitHub link when filePath is absent", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MetaLine, {
      props: { publishDate: new Date("2024-01-05T00:00:00Z") },
    });

    expect(html).not.toContain("View on GitHub");
    expect(html).not.toContain("icon-[lucide--github]");
    expect(html).not.toContain('data-tip="View on GitHub"');
    expect(html).not.toContain("github.com/jimmy-guzman/jimmy.codes");
  });

  it("should merge custom class with base layout classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MetaLine, {
      props: {
        publishDate: new Date("2024-01-05T00:00:00Z"),
        class: "mt-2",
      },
    });

    expect(html).toContain('class="mt-2 flex items-center justify-between"');
  });
});
