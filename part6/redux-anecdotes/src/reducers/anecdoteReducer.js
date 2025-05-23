import { createSlice, current } from "@reduxjs/toolkit";

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
export default anecdoteSlice.reducer;
