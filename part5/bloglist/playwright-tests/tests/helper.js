const loginWith = async (page, username, password) => {
  await page.getByPlaceholder("Enter Username").fill(username);
  await page.getByPlaceholder("Enter Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "New Note" }).click();

  await page.getByPlaceholder("Enter Title").fill(title);
  await page.getByPlaceholder("Enter Author").fill(author);
  await page.getByPlaceholder("Enter URL").fill(url);

  await page.getByRole("button", { name: "Create" }).click();
};

export { loginWith, createBlog };
