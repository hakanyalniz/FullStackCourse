import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "../reducers/anecdoteReducer";
import anecdoteFilterSlice from "../reducers/anecdoteFilterReducer";

const store = configureStore({
  reducer: {
    anecdote: anecdoteSlice,
    filter: anecdoteFilterSlice,
  },
});

export default store;
