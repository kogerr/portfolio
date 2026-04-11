import { test, expect } from "@playwright/test";
import { CarouselPage } from "../pages/carousel.page";

test.describe("Carousel", () => {
  // TC-13
  test("TC-13: carousel manual navigation with arrows", async ({ page }) => {
    const carousel = new CarouselPage(page);

    await page.goto("/work");
    await carousel.expectVisible();
    await carousel.expectSlideCount(3);

    const initialPosition = await carousel.getFirstSlidePosition();

    await carousel.clickNext();
    await page.waitForTimeout(600);

    const afterNext = await carousel.getFirstSlidePosition();
    expect(afterNext).not.toBe(initialPosition);

    await carousel.clickPrevious();
    await page.waitForTimeout(600);

    const afterPrev = await carousel.getFirstSlidePosition();
    expect(afterPrev).toBeCloseTo(initialPosition, 0);
  });
});
