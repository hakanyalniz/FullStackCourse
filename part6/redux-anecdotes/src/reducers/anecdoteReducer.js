import { createSlice, current } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    anecdoteVote(state, action) {
      console.log("Previous state:", current(state));
      console.log("Action", action);

      return state
        .map((element) =>
          element.id === action.payload
            ? { ...element, votes: element.votes + 1 }
            : element
        )
        .sort((a, b) => b.votes - a.votes);
    },

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { anecdoteVote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const fetchedAnecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(fetchedAnecdotes));
  };
};

export const createAnecdotes = (content) => {
  return async (dispatch) => {
    await anecdotesService.createNew({
      content,
      votes: 0,
    });
    const fetchedAnecdotes = await anecdotesService.getAll();

    dispatch(setAnecdotes(fetchedAnecdotes));
  };
};

export default anecdoteSlice.reducer;
