import blogService from "../../services/blogs";
import { useEffect, useState } from "react";
import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import { setAllBlog } from "../../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

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

    // Instead of doing a call to the backend database and updating program state from that
    // we now update the the backend database and update the state from the current state
    // we do this because sometimes the server fetch would be faster than the update
    // therefore returning old data
    const sortedBlogs = blogs.map((blog) =>
      blog.id === likeIncreasedBlog.id
        ? { ...blog, likes: blog.likes + 1 }
        : blog
    );
    dispatch(setAllBlog(sortedBlogs));
    // setBlogs((prevBlogs) =>
    //   prevBlogs.map((blog) =>
    //     blog.id === likeIncreasedBlog.id
    //       ? { ...blog, likes: blog.likes + 1 }
    //       : blog
    //   )
    // );

    // blogService.getAll().then((blogs) => {
    //   console.log("blogs", blogs);

    //   setBlogs(
    //     blogs.sort((a, b) => {
    //       return b.likes - a.likes;
    //     })
    //   );
    // });
  };

  const handleDeleteBlog = async () => {
    console.log("Delete");
    if (window.confirm("Do you really want to delete, ", blog.title)) {
      const response = await blogService.deleteBlog(blog, user.token);
      dispatch(setAllBlog(response.data));
      // setBlogs(response.data);
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
        <div data-testid="like-button-container">
          <span className="like-number">{blog.likes}</span>{" "}
          <button onClick={handleIncreaseLike}>Like</button>
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

// data is null when like request fails
