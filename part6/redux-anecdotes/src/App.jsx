import { useSelector, useDispatch } from "react-redux";
import {
  anecdoteVote,
  addAnecdote,
  setAnecdotes,
} from "./reducers/anecdoteReducer";
import { changeNotification } from "./reducers/notificationReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import anecdotesService from "./services/anecdotes";

import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  const anecdoteFilter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    console.log("state.anecdote", state.anecdote);

    return state.anecdote.filter((anecdote) => {
      return anecdote.content.includes(anecdoteFilter);
    });
  });

  // Fetch the anecdotes from database and set up the state store
  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

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
