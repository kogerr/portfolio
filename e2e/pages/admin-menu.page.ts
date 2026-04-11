import { Page, Locator, expect } from "@playwright/test";

export class AdminMenuPage {
    private readonly page: Page;
    private readonly newPostItem: Locator;
    private readonly editPostsItem: Locator;
    private readonly editAboutItem: Locator;
    private readonly editSlidesItem: Locator;
    private readonly editContactItem: Locator;
    private readonly checkEmailsItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newPostItem = page.getByText("New Post");
        this.editPostsItem = page.getByText("Edit Posts");
        this.editAboutItem = page.getByText("Edit About");
        this.editSlidesItem = page.getByText("Edit Slides");
        this.editContactItem = page.getByText("Edit Contact");
        this.checkEmailsItem = page.getByText("Check Emails");
    }

    async clickNewPost(): Promise<void> {
        await this.newPostItem.click();
    }

    async clickEditPosts(): Promise<void> {
        await this.editPostsItem.click();
    }

    async clickEditAbout(): Promise<void> {
        await this.editAboutItem.click();
    }

    async clickEditSlides(): Promise<void> {
        await this.editSlidesItem.click();
    }

    async clickEditContact(): Promise<void> {
        await this.editContactItem.click();
    }

    async clickCheckEmails(): Promise<void> {
        await this.checkEmailsItem.click();
    }

    async expectMenuVisible(): Promise<void> {
        await expect(this.newPostItem).toBeVisible();
        await expect(this.editPostsItem).toBeVisible();
    }
}
