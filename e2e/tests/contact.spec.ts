import { test, expect } from "@playwright/test";
import { HeaderPage } from "../pages/header.page";

test.describe("Contact panel", () => {
  // TC-02
  test("TC-02: contact panel opens and shows correct details", async ({
    page,
  }) => {
    const header = new HeaderPage(page);

    await page.goto("/work");
    await header.openContact();
    await header.expectContactVisible();
    await header.expectContactEmail("info@botondvoros.com");
    await header.expectContactPhone("+36 70 228 5187");

    // Check Behance and LinkedIn hrefs
    const behance = page.locator('header-contact a:text("Behance")');
    await expect(behance).toHaveAttribute(
      "href",
      /behance\.net\/botondvoros/
    );

    const linkedin = page.locator('header-contact a:text("LinkedIn")');
    await expect(linkedin).toHaveAttribute("href", /linkedin\.com/);
  });

  // TC-03
  test("TC-03: contact panel closes via X button", async ({ page }) => {
    const header = new HeaderPage(page);

    await page.goto("/work");
    await header.openContact();
    await header.expectContactVisible();
    await header.closeContact();
    await header.expectContactHidden();
  });

  // TC-04
  test("TC-04: contact panel closes on scroll", async ({ page }) => {
    const header = new HeaderPage(page);

    await page.goto("/work");
    await header.openContact();
    await header.expectContactVisible();

    // The component sets ongoingAnimation=true for 800ms after opening,
    // during which scroll events don't close the panel. Wait it out.
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(600);

    // After scroll, the contact-header-hide class sets height:0 + overflow:hidden.
    // Check via the class on the header-contact element.
    await expect(page.locator("header-contact")).toHaveClass(/contact-header-hide/);
  });
});
