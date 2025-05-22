import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "notification test",
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
