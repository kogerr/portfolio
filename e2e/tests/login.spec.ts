import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login page", () => {
  // TC-15
  test("TC-15: admin login page renders correctly", async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto("/admin/login");
    await login.expectFormVisible();
  });

  // TC-16
  test("TC-16: invalid credentials shows error", async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto("/admin/login");
    await login.login("wrong@test.com", "wrongpassword");
    await login.expectErrorVisible();
  });
});
