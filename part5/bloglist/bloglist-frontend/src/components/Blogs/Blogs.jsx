import { useState, useEffect, useRef } from "react";
import Blog from "../Blog/Blog";
import CreateBlog from "../CreateBlog/CreateBlog";
import blogService from "../../services/blogs";
import Togglable from "../Togglable/Togglable";

const Blogs = ({ user, handleNotificationMessage }) => {
  const [blogs, setBlogs] = useState([]);
  const createBlogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      <h2>Create Blog</h2>
      <Togglable buttonLabel={"New Note"} ref={createBlogFormRef}>
        <CreateBlog
          user={user}
          setBlogs={setBlogs}
          handleNotificationMessage={handleNotificationMessage}
          createBlogFormRef={createBlogFormRef}
        />
      </Togglable>

      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Blogs;
