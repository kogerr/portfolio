import { Page, Locator, expect } from "@playwright/test";

export class CarouselPage {
    private readonly page: Page;
    private readonly slideWrap: Locator;
    private readonly slides: Locator;
    private readonly leftArrow: Locator;
    private readonly rightArrow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.slideWrap = page.locator("#slide-wrap");
        this.slides = page.locator("app-carousel-slide");
        this.leftArrow = page.locator('#slide-wrap .carousel-arrow').first();
        this.rightArrow = page.locator('#slide-wrap img[style*="right: 0"]');
    }

    async clickPrevious(): Promise<void> { await this.leftArrow.click(); }

    async clickNext(): Promise<void> { await this.rightArrow.click(); }

    async expectVisible(): Promise<void> {
        await expect(this.slideWrap).toBeVisible();
    }

    async expectSlideCount(count: number): Promise<void> {
        await expect(this.slides).toHaveCount(count);
    }

    async getFirstSlidePosition(): Promise<number> {
        return this.slides.first().evaluate((el) => el.getBoundingClientRect().left);
    }

    async expectAllSlideLinksValid(): Promise<void> {
        const slideLinks = this.page.locator("app-carousel-slide a");
        const count = await slideLinks.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
            const href = await slideLinks.nth(i).getAttribute("href");
            expect(href).toMatch(/^\/work\/.+/);
        }
    }
}
