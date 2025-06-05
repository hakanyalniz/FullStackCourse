import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../reducers/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
  },
});

console.log(store.getState());

export default store;
