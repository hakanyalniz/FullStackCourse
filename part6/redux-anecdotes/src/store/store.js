import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "../reducers/anecdoteReducer";
import anecdoteFilterSlice from "../reducers/anecdoteFilterReducer";
import notificationSlice from "../reducers/notificationReducer";

const store = configureStore({
  reducer: {
    anecdote: anecdoteSlice,
    filter: anecdoteFilterSlice,
    notification: notificationSlice,
  },
});

console.log(store.getState());

export default store;
