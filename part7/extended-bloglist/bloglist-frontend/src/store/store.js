import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../reducers/notificationReducer";
import blogReducer from "../reducers/blogReducer";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogReducer,
  },
});

console.log(store.getState());

export default store;
