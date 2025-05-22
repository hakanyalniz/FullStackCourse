import { useSelector, useDispatch } from "react-redux";
import { anecdoteVote, addAnecdote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch();

  const anecdoteFilter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdote.filter((anecdote) =>
      anecdote.content.includes(anecdoteFilter)
    )
  );

  console.log("anecdotes", anecdotes);

  const vote = (id) => {
    dispatch(anecdoteVote({ id }));

    console.log("vote", id);
  };

  const createAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;

    dispatch(addAnecdote({ content }));
  };

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <br />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <br />
      <AnecdoteForm createAnecdote={createAnecdote} />
    </div>
  );
};

export default App;
