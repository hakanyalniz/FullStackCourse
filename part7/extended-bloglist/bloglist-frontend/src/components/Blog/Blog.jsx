import blogService from "../../services/blogs";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setAllBlog } from "../../reducers/blogReducer";

const Blog = () => {
  const { blogID } = useParams();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

  const filteredCurrentBlog = blogs.filter((blog) => blog.id === blogID)[0];

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const visibleOrHidden = visible ? { display: "" } : { display: "none" };
  const deleteVisibleOrHidden = deleteButtonVisible
    ? { display: "" }
    : { display: "none" };

  const handleIncreaseLike = () => {
    const likeIncreasedBlog = {
      ...filteredCurrentBlog,
      likes: filteredCurrentBlog.likes + 1,
      user: filteredCurrentBlog.user.id,
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
  };

  const handleDeleteBlog = async () => {
    console.log("Delete");
    if (
      window.confirm(
        "Do you really want to delete, ",
        filteredCurrentBlog.title
      )
    ) {
      const response = await blogService.deleteBlog(
        filteredCurrentBlog,
        user.token
      );
      dispatch(setAllBlog(response.data));
    }
  };

  const sendCommentToBlog = async (event) => {
    event.preventDefault();

    const message = document.getElementById("message-input").value;
    const response = await axios.put(
      `/api/blogs/${filteredCurrentBlog.id}/comments`,
      {
        message: message,
      }
    );
    console.log(response);
  };

  // handle delete button visibility
  useEffect(() => {
    if (filteredCurrentBlog.user.id === user.id) {
      setDeleteButtonVisible(true);
    } else {
      setDeleteButtonVisible(false);
    }
  }, [filteredCurrentBlog.user.id, user.id]);

  return (
    <div className="p-1.25! my-1.25! border border-black">
      <div>
        {filteredCurrentBlog.title}
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div>{filteredCurrentBlog.author}</div>

      <div style={visibleOrHidden}>
        <div>{filteredCurrentBlog.url}</div>
        <div data-testid="like-button-container">
          <span className="like-number">{filteredCurrentBlog.likes}</span>{" "}
          <button onClick={handleIncreaseLike}>Like</button>
        </div>
        <div>
          <button style={deleteVisibleOrHidden} onClick={handleDeleteBlog}>
            Delete
          </button>
        </div>
      </div>
      <div>
        <h3>Comments</h3>
        <div>
          <form>
            <input
              type="text"
              name="message"
              id="message-input"
              required
              className="border-2 border-black rounded-lg mr-2.5!"
            />
            <button onClick={sendCommentToBlog}>Send</button>
          </form>
        </div>
        <ul>
          {filteredCurrentBlog.messages.map((message, index) => (
            <li key={index}>- {message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;

// There seems to be a small bug that happens now and then when the like button is clicked
// too rapidly between different blogs

// data is null when like request fails

// an error occurs when the page is refreshed, saying that user id could not be found, user is null
