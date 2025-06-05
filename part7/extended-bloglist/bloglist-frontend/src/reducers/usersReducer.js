import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      console.log(action.payload);

      return action.payload;
    },
  },
});

export const { setAllUsers } = usersSlice.actions;

export default usersSlice.reducer;
