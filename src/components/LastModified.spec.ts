import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

// biome-ignore lint/suspicious/noTsIgnore: this is needed
// @ts-ignore
import LastModified from "./LastModified.astro";

describe("LastModified", () => {
  it("should render last updated date", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(LastModified, {
      props: {
        updatedDate: new Date(2020, 8, 3),
      },
    });

    expect(result).toContain("Last updated on Sep 3, 2020");
  });
});
