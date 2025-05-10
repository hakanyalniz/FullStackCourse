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
    await request.post("/api/users", {
      data: {
        name: "anonUser",
        username: "anon",
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

  test("can only see their own delete button", async ({ page }) => {
    await createBlog(page, "Testing Title", "Testing Author", "Testing URL");
    await page.getByRole("button", { name: "View" }).click();
    await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

    await page.getByRole("button", { name: "Logout" }).click();
    await loginWith(page, "anon", "sekret");
    await expect(page.getByText("Successfully logged in!")).toBeVisible();

    await page.getByRole("button", { name: "View" }).click();
    await expect(
      page.getByRole("button", { name: "Delete" })
    ).not.toBeVisible();
  });

  test.only("blogs are sorted according to likes", async ({ page }) => {
    // create three blogs, open them, add their likes to an array, close them
    // continue for all blogs
    // to get the likes for blogs, open them, add likes equal to the number of their position
    const likesArray = [];
    await createBlog(page, "Testing Title 01", "Testing Author", "Testing URL");
    await createBlog(page, "Testing Title 02", "Testing Author", "Testing URL");
    await createBlog(page, "Testing Title 03", "Testing Author", "Testing URL");

    const viewButton = await page.getByRole("button", { name: "View" }).all();
    const blogList = await page.locator(".blog-entry").all();

    // add likes equal to the position of blogs
    for (let i = viewButton.length - 1; i >= 0; i--) {
      await viewButton[i].click();

      for (let x = i; x > 0; x--) {
        await page.getByRole("button", { name: "Like" }).click();
      }

      await viewButton[i].click();
    }

    // refresh page so that blogs can be resorted
    await page.reload();

    // after page reload, check if they are all sorted
    for (let i = 0; i < viewButton.length; i++) {
      await viewButton[i].click();

      // fetch the likes, push to like array
      let element = await blogList[i].locator(".like-number");
      likesArray.push(await element.textContent());

      await viewButton[i].click();
    }

    // likesArray is [3, 2, 1], compare from greater to smaller, 3 to 1
    // ignore the last one, because or else it will go 1 > null
    // as it is, it will go, 2 > 1, which is enough
    for (let h = 0; h < likesArray.length - 1; h++) {
      expect(Number(likesArray[h])).toBeGreaterThan(Number(likesArray[h + 1]));
    }
  });
});
