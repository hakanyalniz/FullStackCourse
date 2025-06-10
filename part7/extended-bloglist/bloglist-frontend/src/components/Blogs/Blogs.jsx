import { useEffect, useRef } from "react";
import Blog from "../Blog/Blog";
import CreateBlog from "../CreateBlog/CreateBlog";
import blogService from "../../services/blogs";
import Togglable from "../Togglable/Togglable";

import { Link } from "react-router-dom";

import { setAllBlog } from "../../reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";

const Blogs = ({ handleNotificationMessage }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const createBlogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setAllBlog(blogs)));
  }, []);

  // useEffect(() => {
  //   console.log("blogs", blogs);
  // }, [blogs]);

  return (
    <>
      <h2>Create Blog</h2>
      <Togglable buttonLabel={"New Note"} ref={createBlogFormRef}>
        <CreateBlog
          user={user}
          handleNotificationMessage={handleNotificationMessage}
          createBlogFormRef={createBlogFormRef}
        />
      </Togglable>

      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/Blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </>
  );
};

export default Blogs;
