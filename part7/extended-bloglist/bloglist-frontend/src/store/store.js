import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../reducers/notificationReducer";
import blogReducer from "../reducers/blogReducer";
import userReducer from "../reducers/userReducer";
import usersReducer from "../reducers/usersReducer";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
});

console.log(store.getState());

export default store;
