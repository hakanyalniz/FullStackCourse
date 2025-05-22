import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "../reducers/anecdoteReducer";
import anecdoteFilterReducer from "../reducers/anecdoteFilterReducer";

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: anecdoteFilterReducer,
  },
});

export default store;
