import blogService from "../../services/blogs";
import { useEffect, useState } from "react";
import "./style.css";

const Blog = ({ blog, setBlogs, user }) => {
  const [visible, setVisible] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const visibleOrHidden = visible ? { display: "" } : { display: "none" };
  const deleteVisibleOrHidden = deleteButtonVisible
    ? { display: "" }
    : { display: "none" };

  const handleIncreaseLike = () => {
    const likeIncreasedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    blogService.updateBlog(likeIncreasedBlog);
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort((a, b) => {
          return b.likes - a.likes;
        })
      )
    );
  };

  const handleDeleteBlog = () => {
    console.log("Delete");
    if (window.confirm("Do you really want to delete, ", blog.title)) {
      blogService.deleteBlog(blog, user.token);
    }
  };

  // handle delete button visibility
  useEffect(() => {
    if (blog.user.id === user.id) {
      setDeleteButtonVisible(true);
    } else {
      setDeleteButtonVisible(false);
    }
  }, [blog.user.id, user.id]);

  return (
    <div className="blog-entry">
      <div>
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>
      <div>{blog.author}</div>

      <div style={visibleOrHidden}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleIncreaseLike}>Like</button>
        </div>
        <div>
          <button style={deleteVisibleOrHidden} onClick={handleDeleteBlog}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;

// There seems to be a small bug that happens now and then when the like button is clicked
// too rapidly between different blogs
