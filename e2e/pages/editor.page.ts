import { Page, Locator, expect } from "@playwright/test";
import * as path from "path";

export class EditorPage {
    private readonly page: Page;
    private readonly titleInput: Locator;
    private readonly titleURLInput: Locator;
    private readonly titleURLError: Locator;
    private readonly clientInput: Locator;
    private readonly yearInput: Locator;
    private readonly typeInput: Locator;
    private readonly linkInput: Locator;
    private readonly introTextarea: Locator;
    private readonly fbDescriptionTextarea: Locator;
    private readonly coverImageInput: Locator;
    private readonly facebookImageInput: Locator;
    private readonly previewImageInput: Locator;
    private readonly contentImagesInput: Locator;
    private readonly addTextButton: Locator;
    private readonly addImageButton: Locator;
    private readonly textEditorTextarea: Locator;
    private readonly saveTextButton: Locator;
    private readonly cancelTextButton: Locator;
    private readonly uploadButton: Locator;
    private readonly updateButton: Locator;
    private readonly contentElements: Locator;
    private readonly successHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = page.locator('input[name="title"]');
        this.titleURLInput = page.locator('input[name="titleURL"]');
        this.titleURLError = page.locator("form .error");
        this.clientInput = page.locator('input[name="client"]');
        this.yearInput = page.locator('input[name="year"]');
        this.typeInput = page.locator('input[name="type"]');
        this.linkInput = page.locator('input[name="link"]');
        this.introTextarea = page.locator('textarea[name="intro"]');
        this.fbDescriptionTextarea = page.locator('textarea[name="fb-description"]');
        this.coverImageInput = page.locator("input#cover-image");
        this.facebookImageInput = page.locator('input[name="facebook-image"]');
        this.previewImageInput = page.locator('input[name="preview-image"]');
        this.contentImagesInput = page.locator('input[name="content-images"]');
        this.addTextButton = page.locator('.control-item:has-text("Text")');
        this.addImageButton = page.locator('.control-item:has-text("Image")');
        this.textEditorTextarea = page.locator('textarea[name="textEditor"]');
        this.saveTextButton = page.locator('.elementControls button:text("Save")');
        this.cancelTextButton = page.locator('.elementControls button:text("Cancel")');
        this.uploadButton = page.getByRole("button", { name: "Upload" });
        this.updateButton = page.getByRole("button", { name: "Update" });
        this.contentElements = page.locator(".contentElementWrap");
        this.successHeading = page.locator('h1:text("Post uploaded")');
    }

    async fillTitle(title: string): Promise<void> {
        await this.titleInput.fill(title);
        await this.page.waitForTimeout(200);
    }

    async fillClient(client: string): Promise<void> {
        await this.clientInput.fill(client);
    }

    async fillYear(year: string): Promise<void> {
        await this.yearInput.fill(year);
    }

    async fillType(type: string): Promise<void> {
        await this.typeInput.fill(type);
    }

    async fillLink(link: string): Promise<void> {
        await this.linkInput.fill(link);
    }

    async fillIntro(intro: string): Promise<void> {
        await this.introTextarea.fill(intro);
    }

    async fillFacebookDescription(description: string): Promise<void> {
        await this.fbDescriptionTextarea.fill(description);
    }

    async uploadCoverImage(filePath: string): Promise<void> {
        await this.coverImageInput.setInputFiles(filePath);
    }

    async uploadFacebookImage(filePath: string): Promise<void> {
        await this.facebookImageInput.setInputFiles(filePath);
    }

    async uploadPreviewImage(filePath: string): Promise<void> {
        await this.previewImageInput.setInputFiles(filePath);
    }

    async uploadContentImages(filePaths: string[]): Promise<void> {
        await this.contentImagesInput.setInputFiles(filePaths);
    }

    async addTextElement(text: string): Promise<void> {
        await this.addTextButton.click();
        await this.textEditorTextarea.fill(text);
        await this.saveTextButton.click();
    }

    async clickUpload(): Promise<void> {
        await this.uploadButton.click();
    }

    async clickUpdate(): Promise<void> {
        await this.updateButton.click();
    }

    async clearTitleURL(): Promise<void> {
        await this.titleURLInput.clear();
    }

    async expectTitleURL(titleURL: string): Promise<void> {
        await expect(this.titleURLInput).toHaveValue(titleURL);
    }

    async expectUploadDisabled(): Promise<void> {
        await expect(this.uploadButton).toBeDisabled();
    }

    async expectUploadEnabled(): Promise<void> {
        await expect(this.uploadButton).toBeEnabled();
    }

    async expectSuccessMessage(): Promise<void> {
        await expect(this.successHeading).toBeVisible();
    }

    async expectContentElementCount(count: number): Promise<void> {
        await expect(this.contentElements).toHaveCount(count);
    }

    async expectTitleURLError(): Promise<void> {
        await expect(this.titleURLError).toBeVisible();
    }

    async removeContentElement(index: number): Promise<void> {
        await this.contentElements.nth(index).locator('img[alt="delete"]').click();
    }

    async moveContentElementUp(index: number): Promise<void> {
        await this.contentElements.nth(index).locator('img[alt="up"]').click();
    }

    async moveContentElementDown(index: number): Promise<void> {
        await this.contentElements.nth(index).locator('img[alt="down"]').click();
    }
}
