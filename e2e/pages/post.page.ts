import { Page, Locator, expect } from "@playwright/test";

export class PostPage {
    private readonly page: Page;
    private readonly title: Locator;
    private readonly type: Locator;
    private readonly client: Locator;
    private readonly year: Locator;
    private readonly coverImage: Locator;
    private readonly contentImages: Locator;
    private readonly contentTexts: Locator;
    private readonly scrollDownArrow: Locator;
    private readonly previousArrow: Locator;
    private readonly moreWorkButton: Locator;
    private readonly nextArrow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator(".post-info h2");
        this.type = page.locator(".post-info .subtitle");
        this.client = page.locator(".details .highlighted-info").first();
        this.year = page.locator(".details .highlighted-info").last();
        this.coverImage = page.locator("img.cover");
        this.contentImages = page.locator(".margin-wrap img");
        this.contentTexts = page.locator(".margin-wrap .concept");
        this.scrollDownArrow = page.locator(".dropdown .bounce");
        this.previousArrow = page.locator(".post-footer img").first();
        this.moreWorkButton = page.locator(".post-footer .more");
        this.nextArrow = page.locator(".post-footer img").last();
    }

    async clickScrollDown(): Promise<void> { await this.scrollDownArrow.click(); }

    async clickPrevious(): Promise<void> { await this.previousArrow.click(); }

    async clickMoreWork(): Promise<void> { await this.moreWorkButton.click(); }

    async clickNext(): Promise<void> { await this.nextArrow.click(); }

    async expectTitle(title: string): Promise<void> {
        await expect(this.title).toHaveText(title);
    }

    async expectType(type: string): Promise<void> {
        await expect(this.type).toHaveText(type);
    }

    async expectClient(client: string): Promise<void> {
        await expect(this.client).toHaveText(client);
    }

    async expectYear(year: string): Promise<void> {
        await expect(this.year).toHaveText(year);
    }

    async expectCoverImageVisible(): Promise<void> {
        await expect(this.coverImage).toBeVisible();
    }

    async expectContentImageCount(count: number): Promise<void> {
        await expect(this.contentImages).toHaveCount(count);
    }

    async expectPageTitle(title: string): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }
}
