import { useNavigate } from "react-router-dom";
import { useField } from "./hooks";

const CreateNew = (props) => {
  const content = useField("text", "content");
  const author = useField("text", "author");
  const info = useField("text", "info");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0,
    });

    navigate("/");
  };

  const handleClear = () => {
    content.resetField();
    author.resetField();
    info.resetField();
  };

  // We can use spread here for our custom hooks because inputProps matches the fields we need for input one to one
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
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
