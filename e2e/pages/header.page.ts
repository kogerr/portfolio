import { Page, Locator, expect } from "@playwright/test";

export class HeaderPage {
    private readonly page: Page;
    private readonly logo: Locator;
    private readonly workLink: Locator;
    private readonly aboutLink: Locator;
    private readonly contactToggle: Locator;
    private readonly contactPanel: Locator;
    private readonly contactCloseButton: Locator;
    private readonly contactEmail: Locator;
    private readonly contactPhone: Locator;
    private readonly contactBehance: Locator;
    private readonly contactLinkedIn: Locator;
    private readonly mobileMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator("#logo-wrap");
        this.workLink = page.locator('.menu a[href="/work"]');
        this.aboutLink = page.locator('.menu a[href="/about"]');
        this.contactToggle = page.locator('.menu span:text("Contact")');
        this.contactPanel = page.locator("header-contact");
        this.contactCloseButton = page.locator("header-contact .closingX");
        this.contactEmail = page.locator("header-contact .header-mail").first();
        this.contactPhone = page.locator("header-contact .header-mail").last();
        this.contactBehance = page.locator('header-contact a:text("Behance")');
        this.contactLinkedIn = page.locator('header-contact a:text("LinkedIn")');
        this.mobileMenuButton = page.locator(".mobile-menu-button");
    }

    async clickLogo(): Promise<void> { await this.logo.click(); }

    async clickWork(): Promise<void> { await this.workLink.click(); }

    async clickAbout(): Promise<void> { await this.aboutLink.click(); }

    async openContact(): Promise<void> { await this.contactToggle.click(); }

    async closeContact(): Promise<void> { await this.contactCloseButton.click(); }

    async expectContactVisible(): Promise<void> {
        await expect(this.contactEmail).toBeVisible();
    }

    async expectContactHidden(): Promise<void> {
        await expect(this.contactPanel).toHaveClass(/contact-header-hide/);
    }

    async expectContactEmail(email: string): Promise<void> {
        await expect(this.contactEmail).toHaveText(email);
    }

    async expectContactPhone(phone: string): Promise<void> {
        await expect(this.contactPhone).toHaveText(phone);
    }

    async expectWorkLinkActive(): Promise<void> {
        await expect(this.workLink).toHaveClass(/active/);
    }

    async expectAboutLinkActive(): Promise<void> {
        await expect(this.aboutLink).toHaveClass(/active/);
    }
}
