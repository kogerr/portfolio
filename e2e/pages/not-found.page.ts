import { Page, Locator, expect } from "@playwright/test";

export class NotFoundPage {
    private readonly page: Page;
    private readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole("heading", { name: "Under Construction" });
    }

    async expectVisible(): Promise<void> {
        await expect(this.heading).toBeVisible();
    }
}
