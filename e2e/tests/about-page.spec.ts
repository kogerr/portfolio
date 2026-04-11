import { test, expect } from "@playwright/test";
import { AboutPage } from "../pages/about.page";

test.describe("About page", () => {
  // TC-09
  test("TC-09: about page loads with all sections", async ({ page }) => {
    const about = new AboutPage(page);

    await page.goto("/about");

    await about.expectIntroVisible();

    await about.expectClientsHeadingVisible();
    await about.expectClientCount(24);

    await about.expectAwardsHeadingVisible();
    await about.expectAwardCountAtLeast(48);

    // Publications heading and content
    await expect(
      page.getByRole("heading", { name: "Publications" })
    ).toBeVisible();
    const printPubs = page
      .locator(".publications-column")
      .first()
      .locator("div");
    const printCount = await printPubs.count();
    expect(printCount).toBeGreaterThanOrEqual(1);

    const onlineLinks = page
      .locator(".publications-column")
      .last()
      .locator("a");
    const onlineCount = await onlineLinks.count();
    expect(onlineCount).toBeGreaterThanOrEqual(1);

    // Exhibitions
    await expect(
      page.getByRole("heading", { name: "Exhibitions" })
    ).toBeVisible();
    const exhibitions = page.locator(".exhibitions div");
    const exhibCount = await exhibitions.count();
    expect(exhibCount).toBeGreaterThanOrEqual(50);
  });
});
