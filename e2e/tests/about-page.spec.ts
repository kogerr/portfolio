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

    await about.expectPublicationsHeadingVisible();
    await about.expectPrintPublicationsCountAtLeast(1);
    await about.expectOnlinePublicationsCountAtLeast(1);

    await about.expectExhibitionsHeadingVisible();
    await about.expectExhibitionCountAtLeast(50);
  });
});
