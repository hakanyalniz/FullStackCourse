import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    status: true,
  },
  reducers: {
    changeNotification(state, action) {
      console.log(action.payload);

      return action.payload;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;

// After 5 seconds change notification to empty string, which will change display to none
// because we check if there is string or not to display it
export const setNotification = (notificationText, status, timeOutTimer) => {
  return (dispatch) => {
    dispatch(changeNotification({ message: notificationText, status: status }));
    setTimeout(() => {
      dispatch(
        changeNotification({
          message: "",
          status: true,
        })
      );
    }, timeOutTimer * 1000);
  };
};
export default notificationSlice.reducer;
