const { describe, test, expect, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByRole("heading", { name: "Login" });
    await expect(locator).toBeVisible();
  });

  test("user can login", async ({ page }) => {
    await loginWith(page, "root", "sekret");

    await expect(page.getByText("Successfully logged in!")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    const errorDiv = await page.locator(".failure");

    await loginWith(page, "root", "wrong");

    await expect(errorDiv).toContainText("Failed logging in.");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
    await expect(page.getByText("Successfully logged in!")).not.toBeVisible();
  });
});

describe("Logged in User", () => {
  beforeEach(async ({ page, request }) => {
    // Reset the users in database, register new user
    // login as new user, get user JSON from local storage
    // use the JSON for sending a request to reset route, which will both reset the blogs and also create a new one
    // the created new blog uses the user credentials sent
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "RootUser",
        username: "root",
        password: "sekret",
      },
    });

    await page.goto("/");

    loginWith(page, "root", "sekret");

    await expect(page.getByText("Successfully logged in!")).toBeVisible();

    // Wait for network to be idle
    await page.waitForLoadState("networkidle");
  });

  test("can create a new blog", async ({ page }) => {
    createBlog(page, "Testing Title", "Testing Author", "Testing URL");

    await expect(page.getByText("Successfully created a blog!")).toBeVisible();
  });

  test("can delete a blog", async ({ page }) => {
    // create a new blog so we can delete it
    createBlog(page, "Testing Title", "Testing Author", "Testing URL");

    await expect(page.getByText("Successfully created a blog!")).toBeVisible();

    page.on("dialog", async (dialog) => {
      console.log(dialog.message()); // Log the alert/confirm message
      await dialog.accept(); // Click "OK"
    });

    const viewButton = await page.getByRole("button", { name: "View" }).all();
    console.log("viewButton", viewButton);

    await viewButton[viewButton.length - 1].click();
    await page.getByRole("button", { name: "Delete" }).click();
  });

  test("can like a blog", async ({ page }) => {
    createBlog(page, "Testing Title", "Testing Author", "Testing URL");

    await page.getByRole("button", { name: "View" }).click();
    await page.getByRole("button", { name: "Like" }).click();
    await expect(
      page.getByTestId("like-button-container").locator(".like-number")
    ).toHaveText("1");
  });
});
