import { useSelector, useDispatch } from "react-redux";
import {
  anecdoteVote,
  setAnecdotes,
  initializeAnecdotes,
} from "./reducers/anecdoteReducer";
import { changeNotification } from "./reducers/notificationReducer";

import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

import anecdotesService from "./services/anecdotes";

const App = () => {
  const dispatch = useDispatch();

  const anecdoteFilter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    return state.anecdote.filter((anecdote) => {
      return anecdote.content.includes(anecdoteFilter);
    });
  });

  // Fetch the anecdotes from database and set up the state store
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  const vote = (anecdote) => {
    dispatch(anecdoteVote(anecdote.id));
    dispatch(changeNotification(`Voted for "${anecdote.content}"`));
  };

  const createAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;

    // After posting to the database, await, then do fetch
    await anecdotesService.createNew({ content, votes: 0 });
    await anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes))); // dispatch(addAnecdote({ content }));
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
