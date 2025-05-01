import blogService from "../../services/blogs";
import { useState } from "react";
import "./style.css";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const visibleOrHidden = visible ? { display: "" } : { display: "none" };

  const handleIncreaseLike = () => {
    console.log("Increase like by 1", blog);
    const likeIncreasedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    blogService.updateBlog(likeIncreasedBlog);
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
