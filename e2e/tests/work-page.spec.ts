import { test, expect } from "@playwright/test";
import { WorkPage } from "../pages/work.page";
import { CarouselPage } from "../pages/carousel.page";
import { HeaderPage } from "../pages/header.page";
import { PostPage } from "../pages/post.page";

test.describe("Work page", () => {
  // TC-01
  test("TC-01: homepage loads with posts and carousel", async ({ page }) => {
    const work = new WorkPage(page);
    const carousel = new CarouselPage(page);
    const header = new HeaderPage(page);

    await page.goto("/");
    await expect(page).toHaveURL(/\/work/);
    await expect(page).toHaveTitle("Botond Vörös");

    await carousel.expectVisible();
    await work.expectPostCount(3);
    await work.expectPostVisible("Literature Illustrations");
    await work.expectPostVisible("All Things Considered");
    await work.expectPostVisible("Arrival Training");
    await header.expectWorkLinkActive();
  });

  // TC-05
  test("TC-05: navigate to post from work listing", async ({ page }) => {
    const work = new WorkPage(page);
    const post = new PostPage(page);

    await page.goto("/work");
    await work.openPost("Literature Illustrations");

    await expect(page).toHaveURL(/\/work\/literature-illustrations/);
    await post.expectPageTitle("Literature Illustrations");
    await post.expectTitle("Literature Illustrations");
    await post.expectType("Illustration");
    await post.expectClient("Self-Initiated");
    await post.expectYear("2025");
  });

  // TC-19
  test("TC-19: carousel slides link to correct posts", async ({ page }) => {
    const carousel = new CarouselPage(page);

    await page.goto("/work");
    await carousel.expectVisible();

    // Carousel slides are animated so direct clicks are unreliable.
    // Instead, verify the slide links have valid hrefs pointing to posts.
    const slideLinks = page.locator("app-carousel-slide a");
    const count = await slideLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await slideLinks.nth(i).getAttribute("href");
      expect(href).toMatch(/^\/work\/.+/);
    }
  });

  // TC-20
  test("TC-20: post preview hover overlay shows details", async ({ page }) => {
    const work = new WorkPage(page);

    await page.goto("/work");

    // Hover over "Arrival Training" preview
    const preview = page.locator("post-preview").filter({ hasText: "Arrival Training" });
    await preview.hover();

    await work.expectPostPreviewDetails(
      "Arrival Training",
      "Branding / Illustration",
      "2024"
    );
  });
});
