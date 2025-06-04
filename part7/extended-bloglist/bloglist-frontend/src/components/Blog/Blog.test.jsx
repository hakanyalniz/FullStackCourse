import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { test } from "vitest";

const user = {
  id: "user_id_s89dj19jdsdsadasdasd",
  name: "TestName",
  username: "TestUserName",
  token: "test_token",
};

const blog = {
  title: "Component testing is done with react-testing-library",
  author: "TestUser",
  url: "www.thisIsATest.com",
  likes: 0,
  id: "blog_id_6802919b710aed2rdr3",
  user: user,
};

// Mock the entire module
// Mock specific methods
vi.mock("../../services/blogs", () => ({
  default: {
    postDB: vi.fn(() => Promise.resolve({ success: true })),
    updateBlog: vi.fn(() => (blog.likes = blog.likes + 1)),
    getAll: vi.fn(() => {
      return Promise.resolve([blog]);
    }),
    deleteBlog: vi.fn(() => Promise.resolve({ success: true })),
  },
}));

test("renders title and author for blog", () => {
  const mockSetStatus = vi.fn();

  render(<Blog blog={blog} setBlogs={mockSetStatus} user={user} />);

  const elementTitle = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  const elementAuthor = screen.getByText("TestUser");

  expect(elementTitle).toBeDefined();
  expect(elementAuthor).toBeDefined();
});

test("content other than title and author is not visible by default", () => {
  const mockSetStatus = vi.fn();

  render(<Blog blog={blog} setBlogs={mockSetStatus} user={user} />);

  const elementURL = screen.getByText("www.thisIsATest.com");

  expect(elementURL).not.toBeVisible();
});

test("content becomes visible after clicking view button", async () => {
  const mockSetStatus = vi.fn();

  render(<Blog blog={blog} setBlogs={mockSetStatus} user={user} />);

  const actionUser = userEvent.setup();
  const button = screen.getByText("View");
  await actionUser.click(button);

  const elementURL = screen.getByText("www.thisIsATest.com");

  expect(elementURL).toBeVisible();
});

test("the like button gives response when clicked", async () => {
  const mockSetStatus = vi.fn();

  render(<Blog blog={blog} setBlogs={mockSetStatus} user={user} />);

  const actionUser = userEvent.setup();
  const button = screen.getByText("Like");
  await actionUser.click(button);

  expect(blog.likes).toBe(1);
});
