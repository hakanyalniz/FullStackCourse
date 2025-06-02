const Anecdote = ({ anecdote }) => {
  // If anecdote is undefined, then it is true with !, in that case return anecdote not found
  // otherwise render it
  return !anecdote ? (
    <div>404 - Anecdote not found</div>
  ) : (
    <div>{anecdote.content}</div>
  );
};

export default Anecdote;
