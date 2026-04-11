import { test, expect } from "@playwright/test";
import { CarouselPage } from "../pages/carousel.page";

test.describe("Carousel", () => {
  // TC-13
  test("TC-13: carousel manual navigation with arrows", async ({ page }) => {
    const carousel = new CarouselPage(page);

    await page.goto("/work");
    await carousel.expectVisible();
    await carousel.expectSlideCount(3);

    // Record initial slide transform/position
    const getSlideTransform = () =>
      page.locator("app-carousel-slide").first().evaluate((el) => {
        return el.getBoundingClientRect().left;
      });

    const initialPosition = await getSlideTransform();

    await carousel.clickNext();
    await page.waitForTimeout(600);

    const afterNext = await getSlideTransform();
    expect(afterNext).not.toBe(initialPosition);

    await carousel.clickPrevious();
    await page.waitForTimeout(600);

    const afterPrev = await getSlideTransform();
    expect(afterPrev).toBeCloseTo(initialPosition, 0);
  });
});
