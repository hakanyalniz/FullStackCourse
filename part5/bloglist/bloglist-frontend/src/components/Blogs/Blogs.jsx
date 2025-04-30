import { useState, useEffect } from "react";
import Blog from "../Blog/Blog";
import CreateBlog from "../CreateBlog/CreateBlog";
import blogService from "../../services/blogs";

const Blogs = ({ user, handleNotificationMessage }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      <h2>Create Blog</h2>

      <CreateBlog
        user={user}
        setBlogs={setBlogs}
        handleNotificationMessage={handleNotificationMessage}
      />

      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
