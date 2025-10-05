import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// biome-ignore lint/suspicious/noTsIgnore: this is needed
// @ts-ignore
import Footer from "./Footer.astro";

describe("Footer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render year", async () => {
    const date = new Date(2000, 1, 1, 13);

    vi.setSystemTime(date);

    const container = await AstroContainer.create();
    const result = await container.renderToString(Footer);

    expect(result).toContain("2000");
  });
});
