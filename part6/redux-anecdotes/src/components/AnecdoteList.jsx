import PropTypes from "prop-types";

const AnecdoteList = ({ anecdotes, vote }) => {
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
  vote: PropTypes.func.isRequired,
};

export default AnecdoteList;
