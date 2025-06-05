import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

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

export const setThunkAllUsers = () => {
  return async (dispatch) => {
    const response = await usersService.getAllUsers();
    dispatch(setAllUsers(response));
  };
};

export default usersSlice.reducer;
