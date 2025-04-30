import { useState } from "react";
import "./style.css";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const visibleOrHidden = visible ? { display: "" } : { display: "none" };

  return (
    <div className="blog-entry">
      <div>
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>

      <div style={visibleOrHidden}>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button>Like</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
