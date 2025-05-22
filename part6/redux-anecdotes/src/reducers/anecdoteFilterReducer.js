import { createSlice } from "@reduxjs/toolkit";

const anecdoteFilterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdote(state, action) {
      console.log("Previous state:", state);

      return action.payload;
    },
  },
});

export const { filterAnecdote } = anecdoteFilterSlice.actions;
export default anecdoteFilterSlice.reducer;
