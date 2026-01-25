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
        minutes: 5,
        publishDate: new Date("2024-01-05T00:00:00Z"),
      },
    });

    expect(html).toContain("5 min read");
  });

  it("should merge custom class with base layout classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(MetaLine, {
      props: {
        class: "mt-2",
        publishDate: new Date("2024-01-05T00:00:00Z"),
      },
    });

    expect(html).toContain('class="mt-2 flex items-center justify-between"');
  });
});
