import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const mockSetStatus = vi.fn();

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

  render(<Blog blog={blog} setBlogs={mockSetStatus} user={user} />);

  const elementTitle = screen.getByText(
    "Component testing is done with react-testing-library"
  );

  const elementAuthor = screen.getByText("TestUser");

  screen.debug();

  expect(elementTitle).toBeDefined();
  expect(elementAuthor).toBeDefined();
});
