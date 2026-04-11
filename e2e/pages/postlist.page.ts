import { Page, Locator, expect } from "@playwright/test";

export class PostlistPage {
    private readonly page: Page;
    private readonly postItems: Locator;
    private readonly addNewPostButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.postItems = page.locator(".postPreviewWrap");
        this.addNewPostButton = page.getByRole("button", { name: "Add new post" });
    }

    async deletePost(index: number): Promise<void> {
        await this.postItems.nth(index).locator('img[alt="delete"]').click();
    }

    async deletePostByTitle(title: string): Promise<void> {
        const item = this.postItems.filter({ hasText: title });
        await item.locator('img[alt="delete"]').click();
    }

    async movePostUp(index: number): Promise<void> {
        await this.postItems.nth(index).locator('img[alt="up"]').click();
    }

    async movePostDown(index: number): Promise<void> {
        await this.postItems.nth(index).locator('img[alt="down"]').click();
    }

    async clickPostTitle(title: string): Promise<void> {
        await this.postItems.filter({ hasText: title }).locator(".clickable").first().click();
    }

    async clickPostPreviewImage(title: string): Promise<void> {
        await this.postItems.filter({ hasText: title }).locator(".postPreview").click();
    }

    async clickCheckPost(title: string): Promise<void> {
        await this.postItems.filter({ hasText: title }).locator('div:text("Check")').click();
    }

    async clickAddNewPost(): Promise<void> {
        await this.addNewPostButton.click();
    }

    async expectPostCount(count: number): Promise<void> {
        await expect(this.postItems).toHaveCount(count);
    }

    async expectPostVisible(title: string): Promise<void> {
        await expect(this.postItems.filter({ hasText: title })).toBeVisible();
    }

    async expectPostNotVisible(title: string): Promise<void> {
        await expect(this.postItems.filter({ hasText: title })).toHaveCount(0);
    }

    async expectPostAtIndex(title: string, index: number): Promise<void> {
        const titleElement = this.postItems.nth(index).locator(".clickable").first();
        await expect(titleElement).toHaveText(title);
    }
}
