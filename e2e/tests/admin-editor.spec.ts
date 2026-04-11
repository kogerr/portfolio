import { test, expect } from "../fixtures";
import { LoginPage } from "../pages/login.page";
import { EditorPage } from "../pages/editor.page";
import { PostlistPage } from "../pages/postlist.page";
import { PostPage } from "../pages/post.page";
import type { Page } from "@playwright/test";
import * as path from "path";

const ASSETS_DIR = path.resolve(__dirname, "../assets");

async function loginAsAdmin(
  page: Page,
  adminUser: { email: string; password: string }
): Promise<void> {
  const login = new LoginPage(page);
  await page.goto("/admin/login");
  await login.login(adminUser.email, adminUser.password);
  await page.waitForURL("**/admin", { timeout: 10000 });
  await expect(page).not.toHaveURL(/\/admin\/login/);
}

async function createTestPost(page: Page, editor: EditorPage): Promise<void> {
  await page.goto("/admin/editor");
  await editor.fillTitle("E2E Test Post");
  await editor.fillClient("Test Client");
  await editor.fillYear("2026");
  await editor.fillType("Test Type");
  await editor.fillIntro("This is a test post intro.");
  await editor.clickUpload();
  await page.waitForURL("**/admin/postlist");
}

async function cleanupTestPost(
  page: Page,
  postlist: PostlistPage
): Promise<void> {
  await page.goto("/admin/postlist");
  await postlist.deletePostByTitle("E2E Test Post");
}

test.describe("Admin Editor", () => {
  // TC-26
  test("TC-26: upload button disabled when title URL empty", async ({
    page,
    adminUser,
  }) => {
    const editor = new EditorPage(page);

    await loginAsAdmin(page, adminUser);
    await page.goto("/admin/editor");

    await editor.expectUploadDisabled();

    await editor.fillTitle("Some Title");
    await editor.expectUploadEnabled();

    await editor.clearTitleURL();
    await editor.expectUploadDisabled();
  });

  // TC-27
  test("TC-27: duplicate title URL shows error", async ({
    page,
    adminUser,
  }) => {
    const editor = new EditorPage(page);

    await loginAsAdmin(page, adminUser);
    await page.goto("/admin/editor");

    await editor.fillTitle("Literature Illustrations");
    await page.waitForTimeout(1000);

    await editor.expectTitleURLError();
  });

  // TC-29
  test("TC-29: add text content to post", async ({
    page,
    adminUser,
  }) => {
    const editor = new EditorPage(page);
    const postlist = new PostlistPage(page);
    const postPage = new PostPage(page);

    await loginAsAdmin(page, adminUser);

    try {
      await page.goto("/admin/editor");
      await editor.fillTitle("E2E Test Post");
      await editor.fillClient("Test Client");
      await editor.fillYear("2026");
      await editor.fillType("Test Type");
      await editor.fillIntro("This is a test post intro.");

      await editor.addTextElement("This is test content text.");
      await editor.expectContentElementCount(1);

      await editor.clickUpload();
      await page.waitForURL("**/admin/postlist");

      await page.goto("/work/e2e-test-post");
      await postPage.expectTitle("E2E Test Post");
      await postPage.expectTextSectionVisible();
    } finally {
      await cleanupTestPost(page, postlist);
    }
  });

  // TC-30
  test("TC-30: create post with all image types", async ({
    page,
    adminUser,
  }) => {
    const editor = new EditorPage(page);
    const postlist = new PostlistPage(page);
    const postPage = new PostPage(page);

    await loginAsAdmin(page, adminUser);

    try {
      await page.goto("/admin/editor");
      await editor.fillTitle("E2E Test Post");
      await editor.fillClient("Test Client");
      await editor.fillYear("2026");
      await editor.fillType("Test Type");
      await editor.fillIntro("This is a test post intro.");

      await editor.uploadCoverImage(path.join(ASSETS_DIR, "test-cover.svg"));
      await page.waitForTimeout(1000);

      await editor.uploadPreviewImage(
        path.join(ASSETS_DIR, "test-preview.svg")
      );
      await page.waitForTimeout(1000);

      await editor.uploadFacebookImage(
        path.join(ASSETS_DIR, "test-facebook.svg")
      );
      await page.waitForTimeout(1000);

      await editor.uploadContentImages([
        path.join(ASSETS_DIR, "test-content-full.svg"),
      ]);
      await page.waitForTimeout(1000);

      await editor.clickUpload();
      await page.waitForURL("**/admin/postlist");

      await page.goto("/work/e2e-test-post");
      await postPage.expectCoverImageVisible();
      await postPage.expectContentImageCount(1);
    } finally {
      await cleanupTestPost(page, postlist);
    }
  });
});
