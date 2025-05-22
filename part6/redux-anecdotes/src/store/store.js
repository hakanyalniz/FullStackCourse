import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "../reducers/anecdoteReducer";
import anecdoteFilterSlice from "../reducers/anecdoteFilterReducer";

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: anecdoteFilterSlice,
  },
});

export default store;
