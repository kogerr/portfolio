import { test, expect } from "@playwright/test";
import { PostPage } from "../pages/post.page";
import { WorkPage } from "../pages/work.page";

test.describe("Post page", () => {
  // TC-06
  test("TC-06: post page displays cover and content images", async ({
    page,
  }) => {
    const post = new PostPage(page);

    await page.goto("/work/literature-illustrations");
    await post.expectCoverImageVisible();
    await post.expectContentImageCount(15);
    await post.expectTextSectionCountAtLeast(1);
  });

  // TC-07
  test("TC-07: post navigation - previous and next", async ({ page }) => {
    const post = new PostPage(page);

    await page.goto("/work/all-things-considered");

    // Scroll to post footer
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await page.waitForTimeout(500);

    await post.clickNext();
    await expect(page).not.toHaveURL(/\/work\/all-things-considered/);

    // Navigate back
    await page.goto("/work/all-things-considered");
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await page.waitForTimeout(500);

    await post.clickPrevious();
    await expect(page).not.toHaveURL(/\/work\/all-things-considered/);
  });

  // TC-08
  test('TC-08: "More Work" returns to listing', async ({ page }) => {
    const post = new PostPage(page);
    const work = new WorkPage(page);

    await page.goto("/work/arrival-training");

    // Scroll to post footer
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await page.waitForTimeout(500);

    await post.clickMoreWork();
    await expect(page).toHaveURL(/\/work$/);
    await work.expectPostCount(3);
  });
});
