import { Page, Locator, expect } from "@playwright/test";

export class FooterPage {
    private readonly page: Page;
    private readonly footer: Locator;
    private readonly email: Locator;
    private readonly behance: Locator;
    private readonly linkedIn: Locator;
    private readonly scrollUpArrow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footer = page.locator("footer");
        this.email = page.locator("footer .footer-mail");
        this.behance = page.locator("footer .footer-items a").first();
        this.linkedIn = page.locator("footer .footer-items a").last();
        this.scrollUpArrow = page.locator("footer .arrow");
    }

    async clickScrollUp(): Promise<void> { await this.scrollUpArrow.click(); }

    async expectEmail(email: string): Promise<void> {
        await expect(this.email).toHaveText(email);
    }

    async expectVisible(): Promise<void> {
        await expect(this.footer).toBeVisible();
    }
}
