import blogService from "../../services/blogs";

const CreateBlog = ({ user, setBlogs }) => {
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

    console.log(await blogService.getAll());
    setBlogs(await blogService.getAll());
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
