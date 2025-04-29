import blogService from "../../services/blogs";
import NotificationBar from "../NotificationBar/NotificationBar";

const CreateBlog = ({ user, setBlogs, handleNotificationMessage }) => {
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    console.log(event.target[0].value);

    await blogService.postBlog(
      {
        title: event.target[0].value,
        author: event.target[1].value,
        url: event.target[2].value,
      },
      user.token
    );

    setBlogs(await blogService.getAll());
    handleNotificationMessage("Successfully created a blog!");
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <span>title:</span>
        <input type="text" name="Title" placeholder="Enter Title" required />
      </div>
      <div>
        <span>author:</span>
        <input type="text" name="Author" placeholder="Enter Author" required />
      </div>
      <div>
        <span>url:</span>
        <input type="text" name="URL" placeholder="Enter URL" required />
      </div>

      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlog;
