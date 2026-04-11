import { Page, Locator, expect } from "@playwright/test";

export class AboutPage {
    private readonly page: Page;
    private readonly introText: Locator;
    private readonly clientsHeading: Locator;
    private readonly clientItems: Locator;
    private readonly awardsHeading: Locator;
    private readonly awardHeaders: Locator;
    private readonly publicationsHeading: Locator;
    private readonly printPublications: Locator;
    private readonly onlinePublications: Locator;
    private readonly exhibitionsHeading: Locator;
    private readonly exhibitionItems: Locator;
    private readonly images: Locator;

    constructor(page: Page) {
        this.page = page;
        this.introText = page.locator(".ars-poetica .intro-paragraph");
        this.clientsHeading = page.getByRole("heading", { name: "Selected Clients" });
        this.clientItems = page.locator(".clients div");
        this.awardsHeading = page.getByRole("heading", { name: "Awards" });
        this.awardHeaders = page.locator(".award-header");
        this.publicationsHeading = page.getByRole("heading", { name: "Publications" });
        this.printPublications = page.locator(".publications-column").first().locator("div");
        this.onlinePublications = page.locator(".publications-column").last().locator("a");
        this.exhibitionsHeading = page.getByRole("heading", { name: "Exhibitions" });
        this.exhibitionItems = page.locator(".exhibitions div");
        this.images = page.locator(".full-box img");
    }

    async expectIntroVisible(): Promise<void> {
        await expect(this.introText.first()).toBeVisible();
    }

    async expectClientsHeadingVisible(): Promise<void> {
        await expect(this.clientsHeading).toBeVisible();
    }

    async expectClientCount(min: number): Promise<void> {
        await expect(this.clientItems).toHaveCount(min);
    }

    async expectAwardsHeadingVisible(): Promise<void> {
        await expect(this.awardsHeading).toBeVisible();
    }

    async expectAwardCountAtLeast(min: number): Promise<void> {
        const count = await this.awardHeaders.count();
        expect(count).toBeGreaterThanOrEqual(min);
    }

    async expectSectionsPresent(): Promise<void> {
        await expect(this.clientsHeading).toBeVisible();
        await expect(this.awardsHeading).toBeVisible();
        await expect(this.publicationsHeading).toBeVisible();
        await expect(this.exhibitionsHeading).toBeVisible();
    }
}
