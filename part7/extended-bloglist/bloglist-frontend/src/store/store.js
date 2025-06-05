import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../reducers/notificationReducer";
import blogReducer from "../reducers/blogReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogReducer,
    user: userReducer,
  },
});

console.log(store.getState());

export default store;
