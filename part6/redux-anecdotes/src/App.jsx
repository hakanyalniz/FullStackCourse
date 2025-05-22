import { useSelector, useDispatch } from "react-redux";
import { anecdoteVote, addAnecdote } from "./reducers/anecdoteReducer";
import { changeNotification } from "./reducers/notificationReducer";
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

  const vote = (anecdote) => {
    dispatch(anecdoteVote(anecdote.id));
    dispatch(changeNotification(`Voted for "${anecdote.content}"`));

    console.log("vote", anecdote.id);
  };

  const createAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;

    dispatch(addAnecdote({ content }));
    dispatch(changeNotification(`Created "${content}"`));
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
