import { test, expect } from "../fixtures";
import { LoginPage } from "../pages/login.page";
import { AdminMenuPage } from "../pages/admin-menu.page";
import { EditorPage } from "../pages/editor.page";
import { PostlistPage } from "../pages/postlist.page";
import { PostPage } from "../pages/post.page";
import type { Page } from "@playwright/test";

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

test.describe("Admin Post CRUD", () => {
  // TC-22
  test("TC-22: create a new post with minimal fields", async ({
    page,
    adminUser,
  }) => {
    const adminMenu = new AdminMenuPage(page);
    const editor = new EditorPage(page);
    const postlist = new PostlistPage(page);

    await loginAsAdmin(page, adminUser);

    await page.goto("/admin");
    await adminMenu.clickNewPost();
    await expect(page).toHaveURL(/\/admin\/editor/);

    await editor.fillTitle("E2E Test Post");
    await editor.expectTitleURL("e2e-test-post");
    await editor.fillClient("Test Client");
    await editor.fillYear("2026");
    await editor.fillType("Test Type");
    await editor.fillIntro("This is a test post intro.");

    await editor.clickUpload();
    await editor.expectSuccessMessage();
    await page.waitForURL("**/admin/postlist");

    await postlist.expectPostVisible("E2E Test Post");

    // Cleanup
    await postlist.deletePostByTitle("E2E Test Post");
  });

  // TC-23
  test("TC-23: verify created post on public page", async ({
    page,
    adminUser,
  }) => {
    const editor = new EditorPage(page);
    const postlist = new PostlistPage(page);
    const postPage = new PostPage(page);

    await loginAsAdmin(page, adminUser);

    try {
      await createTestPost(page, editor);

      await page.goto("/work/e2e-test-post");
      await postPage.expectTitle("E2E Test Post");
      await postPage.expectType("Test Type");
      await postPage.expectClient("Test Client");
      await postPage.expectYear("2026");
    } finally {
      await cleanupTestPost(page, postlist);
    }
  });

  // TC-24
  test("TC-24: delete a post from postlist", async ({ page, adminUser }) => {
    const editor = new EditorPage(page);
    const postlist = new PostlistPage(page);

    await loginAsAdmin(page, adminUser);
    await createTestPost(page, editor);

    await page.goto("/admin/postlist");
    await postlist.expectPostCount(4);

    await postlist.deletePostByTitle("E2E Test Post");

    await postlist.expectPostCount(3);
    await postlist.expectPostNotVisible("E2E Test Post");
  });

  // TC-25
  test("TC-25: edit an existing post", async ({ page, adminUser }) => {
    const editor = new EditorPage(page);
    const postlist = new PostlistPage(page);
    const postPage = new PostPage(page);

    await loginAsAdmin(page, adminUser);

    try {
      await createTestPost(page, editor);

      await page.goto("/admin/postlist");
      await postlist.clickPostPreviewImage("E2E Test Post");
      await expect(page).toHaveURL(/\/admin\/editor\/e2e-test-post/);

      await editor.fillClient("Updated Client");
      await editor.clickUpdate();
      await page.waitForURL("**/admin/postlist");

      await page.goto("/work/e2e-test-post");
      await postPage.expectClient("Updated Client");
    } finally {
      await cleanupTestPost(page, postlist);
    }
  });
});
