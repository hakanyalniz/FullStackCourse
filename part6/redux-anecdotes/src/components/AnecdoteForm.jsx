import PropTypes from "prop-types";

const AnecdoteForm = ({ createAnecdote }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func.isRequired, // Ensures that createAnecdote is a function and required
};

export default AnecdoteForm;
