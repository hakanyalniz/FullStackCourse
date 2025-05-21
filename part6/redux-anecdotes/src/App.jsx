import { useSelector, useDispatch } from "react-redux";
import { createAction } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
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
    dispatch(createAction("VOTE", { id }));

    console.log("vote", id);
  };

  const createAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;

    dispatch(createAction("ADD_ANECDOTE", { content }));
  };

  return (
    <div>
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
