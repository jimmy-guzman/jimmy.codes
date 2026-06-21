import { expect, test } from "@playwright/test";

test.describe("Primary journeys", () => {
  test("should browse home to about to blog", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Jimmy Guzman Moreno");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Hi, I'm Jimmy",
    );

    // The nav renders each link twice (a `md:hidden` mobile cluster + the desktop
    // cluster), so target the desktop link with `.last()` to avoid a strict-mode
    // match on the briefly-exposed mobile link. `force: true` skips the stability
    // wait, which the MPA view transition defeats by freezing the old-page
    // snapshot over the (interactive) new DOM.
    await page
      .getByRole("link", { exact: true, name: "About" })
      .last()
      .click({ force: true });
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "About Me",
    );

    await page
      .getByRole("link", { exact: true, name: "Blog" })
      .last()
      .click({ force: true });
    await expect(page).toHaveURL("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Blog");
  });

  test("should open mobile menu and navigate", async ({ page }) => {
    await page.setViewportSize({ height: 812, width: 375 });

    await page.goto("/");

    await page.getByRole("button", { name: "More" }).click();

    await page.getByRole("link", { name: "RSS" }).click();

    await expect(page).toHaveURL(/\/rss\.xml$/);
  });

  test("should filter blog posts by tag", async ({ page }) => {
    await page.goto("/blog");

    const firstTag = page
      .getByRole("navigation", { name: "Filter posts by tag" })
      .getByRole("link")
      .first();

    const tagText = await firstTag.textContent();
    await firstTag.click();

    await expect(page).toHaveURL(/\/blog\/tags\/.+/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      tagText?.trim() || "",
    );
  });

  test("should navigate to all tags page from more link", async ({ page }) => {
    await page.goto("/blog");

    const moreLink = page.getByRole("link", { name: /\+\d+ more/ });

    if (await moreLink.isVisible()) {
      await moreLink.click();
      await expect(page).toHaveURL("/blog/tags");
    }
  });
});
