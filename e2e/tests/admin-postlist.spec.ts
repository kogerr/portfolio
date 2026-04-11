import { test, expect } from "../fixtures";
import { LoginPage } from "../pages/login.page";
import { PostlistPage } from "../pages/postlist.page";
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

test.describe("Admin Post List", () => {
  // TC-28
  test("TC-28: reorder posts in postlist", async ({ page, adminUser }) => {
    const postlist = new PostlistPage(page);

    await loginAsAdmin(page, adminUser);
    await page.goto("/admin/postlist");

    await postlist.expectPostAtIndex("Literature Illustrations", 0);

    await postlist.movePostDown(0);
    await page.waitForTimeout(500);

    await postlist.expectPostAtIndex("All Things Considered", 0);
    await postlist.expectPostAtIndex("Literature Illustrations", 1);

    // Restore original order
    await postlist.movePostUp(1);
    await page.waitForTimeout(500);

    await postlist.expectPostAtIndex("Literature Illustrations", 0);
  });
});
