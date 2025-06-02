import { useNavigate } from "react-router-dom";
import { useField, resetField } from "./hooks";

const CreateNew = (props) => {
  const content = useField("text", "content");
  const author = useField("text", "author");
  const info = useField("text", "info");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    navigate("/");
  };

  const handleClear = () => {
    resetField();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button
          type="button" // Apparently using type button prevents it from trigger onSubmit
          onClick={handleClear}
        >
          clear
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
