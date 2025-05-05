import { render, screen } from "@testing-library/react";
import CreateBlog from "./CreateBlog";
import userEvent from "@testing-library/user-event";
import { test } from "vitest";
import blogService from "../../services/blogs";

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

// Mock the entire blogs service module
// Mock specific methods
vi.mock("../../services/blogs", () => ({
  default: {
    postBlog: vi.fn(() => Promise.resolve({ success: true })),
    updateBlog: vi.fn(() => (blog.likes = blog.likes + 1)),
    getAll: vi.fn(() => {
      return Promise.resolve([blog]);
    }),
    deleteBlog: vi.fn(() => Promise.resolve({ success: true })),
  },
}));

// Mock useRef before rendering the component
vi.mock("react", async () => ({
  ...(await vi.importActual("react")), // Keep other React features
  useRef: vi.fn(() => ({
    current: {
      toggleVisibility: vi.fn(),
    },
  })),
}));

test("verify create blog input data", async () => {
  const mockSetStatus = vi.fn();
  const mockHandleNotificationMessage = vi.fn();
  const mockCreateBlogFormRef = {
    current: { toggleVisibility: vi.fn() },
  };

  render(
    <CreateBlog
      user={user}
      setBlogs={mockSetStatus}
      handleNotificationMessage={mockHandleNotificationMessage}
      createBlogFormRef={mockCreateBlogFormRef}
    />
  );

  const titleInput = screen.getByPlaceholderText("Enter Title");
  const authorInput = screen.getByPlaceholderText("Enter Author");
  const urlInput = screen.getByPlaceholderText("Enter URL");

  const actionUser = userEvent.setup();

  await actionUser.type(titleInput, "testingTitleInput");
  await actionUser.type(authorInput, "testingAuthorInput");
  await actionUser.type(urlInput, "testingURLInput");

  const createButton = screen.getByText("Create");
  await actionUser.click(createButton);

  expect(blogService.postBlog).toHaveBeenCalledWith(
    {
      title: "testingTitleInput",
      author: "testingAuthorInput",
      url: "testingURLInput",
    },
    "test_token"
  );
});
