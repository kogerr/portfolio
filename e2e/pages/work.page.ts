import { Page, Locator, expect } from "@playwright/test";

export class WorkPage {
    private readonly page: Page;
    private readonly coverSection: Locator;
    private readonly postPreviews: Locator;

    constructor(page: Page) {
        this.page = page;
        this.coverSection = page.locator("#cover");
        this.postPreviews = page.locator("post-preview");
    }

    async openPost(title: string): Promise<void> {
        await this.postPreviews.filter({ hasText: title }).click();
    }

    async expectPostCount(count: number): Promise<void> {
        await expect(this.postPreviews).toHaveCount(count);
    }

    async expectPostVisible(title: string): Promise<void> {
        await expect(this.postPreviews.filter({ hasText: title })).toBeVisible();
    }

    async expectPostPreviewDetails(title: string, type: string, year: string): Promise<void> {
        const preview = this.postPreviews.filter({ hasText: title });
        await expect(preview.locator(".overlay h2")).toHaveText(title);
        await expect(preview.locator(".overlay .subtitle")).toHaveText(type);
        await expect(preview.locator(".overlay .year")).toHaveText(year);
    }
}
