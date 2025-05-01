import blogService from "../../services/blogs";
import { useEffect, useState } from "react";
import "./style.css";

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const visibleOrHidden = visible ? { display: "" } : { display: "none" };

  const handleIncreaseLike = () => {
    const likeIncreasedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    blogService.updateBlog(likeIncreasedBlog);
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  return (
    <div className="blog-entry">
      <div>
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>

      <div style={visibleOrHidden}>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleIncreaseLike}>Like</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
