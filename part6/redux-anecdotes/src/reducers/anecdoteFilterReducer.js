import { createSlice } from "@reduxjs/toolkit";

const anecdoteFilterSlice = createSlice({
  name: "filterReducer",
  initialState: "",
  reducers: {
    filterAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { filterAnecdote } = anecdoteFilterSlice.actions;
export default anecdoteFilterSlice.reducer;
