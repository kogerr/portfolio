import { test, expect } from "@playwright/test";
import { FooterPage } from "../pages/footer.page";

test.describe("Footer", () => {
  // TC-11
  test("TC-11: footer is present and correct on all pages", async ({
    page,
  }) => {
    const footer = new FooterPage(page);

    await page.goto("/work");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await footer.expectVisible();
    await footer.expectEmail("info@botondvoros.com");

    await page.goto("/about");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await footer.expectVisible();
    await footer.expectEmail("info@botondvoros.com");

    await page.goto("/work/literature-illustrations");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await footer.expectVisible();
  });

  // TC-12
  test("TC-12: footer scroll-up returns to top", async ({ page }) => {
    const footer = new FooterPage(page);

    await page.goto("/about");

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    await footer.clickScrollUp();

    // Wait for smooth scroll to complete — the about page is very long
    await page.waitForFunction(() => window.scrollY < 100, null, { timeout: 10000 });
  });
});
