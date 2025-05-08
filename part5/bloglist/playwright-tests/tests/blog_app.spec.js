const { describe, test, expect, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByRole("heading", { name: "Login" });
    await expect(locator).toBeVisible();
  });

  test("user can login", async ({ page }) => {
    await page.getByPlaceholder("Enter Username").fill("root");
    await page.getByPlaceholder("Enter Password").fill("sekret");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Successfully logged in!")).toBeVisible();
  });
});

describe("Logged in User", () => {
  beforeEach(async ({ page, request }) => {
    // Reset the users in database, register new user
    // login as new user, get user JSON from local storage
    // use the JSON for sending a request to reset route, which will both reset the blogs and also create a new one
    // the created new blog uses the user credentials sent
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "RootUser",
        username: "root",
        password: "sekret",
      },
    });

    await page.goto("http://localhost:5173");

    await page.getByPlaceholder("Enter Username").fill("root");
    await page.getByPlaceholder("Enter Password").fill("sekret");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Successfully logged in!")).toBeVisible();

    // Wait for network to be idle
    await page.waitForLoadState("networkidle");
  });

  test("can create a new blog", async ({ page }) => {
    await page.getByRole("button", { name: "New Note" }).click();

    await page.getByPlaceholder("Enter Title").fill("Testing Title");
    await page.getByPlaceholder("Enter Author").fill("Testing Author");
    await page.getByPlaceholder("Enter URL").fill("Testing URL");

    await page.getByRole("button", { name: "Create" }).click();

    await expect(page.getByText("Successfully created a blog!")).toBeVisible();
  });

  test("can delete a blog", async ({ page }) => {
    // create a new blog so we can delete it
    await page.getByRole("button", { name: "New Note" }).click();

    await page.getByPlaceholder("Enter Title").fill("Testing Title");
    await page.getByPlaceholder("Enter Author").fill("Testing Author");
    await page.getByPlaceholder("Enter URL").fill("Testing URL");

    await page.getByRole("button", { name: "Create" }).click();
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
});
