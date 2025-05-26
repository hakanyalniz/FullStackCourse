import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    changeNotification(state, action) {
      return action.payload;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;

// After 5 seconds change notification to empty string, which will change display to none
// because we check if there is string or not to display it
export const setNotification = (notificationText, timeOutTimer) => {
  return (dispatch) => {
    dispatch(changeNotification(notificationText));
    setTimeout(() => {
      dispatch(changeNotification(""));
    }, timeOutTimer * 1000);
  };
};
export default notificationSlice.reducer;
