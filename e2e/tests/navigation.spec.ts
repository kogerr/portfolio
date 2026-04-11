import { test, expect } from "@playwright/test";
import { HeaderPage } from "../pages/header.page";
import { NotFoundPage } from "../pages/not-found.page";
import { PostPage } from "../pages/post.page";
import { LoginPage } from "../pages/login.page";

test.describe("Header navigation between pages", () => {
  // TC-10
  test("TC-10: navigates between Work, About, and logo home", async ({
    page,
  }) => {
    const header = new HeaderPage(page);

    await page.goto("/work");
    await header.expectWorkLinkActive();

    await header.clickAbout();
    await expect(page).toHaveURL(/\/about/);
    await header.expectAboutLinkActive();

    await header.clickWork();
    await expect(page).toHaveURL(/\/work/);

    await header.clickLogo();
    await expect(page).toHaveURL(/\/work/);
  });
});

test.describe("404 page", () => {
  // TC-14
  test("TC-14: shows Under Construction for invalid routes", async ({
    page,
  }) => {
    const notFound = new NotFoundPage(page);
    const header = new HeaderPage(page);

    await page.goto("/nonexistent-page");
    await notFound.expectVisible();

    // Header still present
    await header.expectLogoVisible();
  });
});

test.describe("Protected admin routes", () => {
  // TC-17
  test("TC-17: admin routes redirect to login when not authenticated", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);

    await page.goto("/admin/postlist");
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

test.describe("Document title updates", () => {
  // TC-18
  test("TC-18: post page title updates document title", async ({ page }) => {
    const post = new PostPage(page);

    await page.goto("/work/arrival-training");
    await post.expectPageTitle("Arrival Training");

    await page.goto("/work/literature-illustrations");
    await post.expectPageTitle("Literature Illustrations");

    await page.goto("/work");
    await expect(page).toHaveTitle("Botond Vörös");
  });
});
