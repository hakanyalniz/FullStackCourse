import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

/**
 * @typedef {object} User
 * @property {string | null} id
 * @property {string | null} name
 * @property {string | null} username
 * @property {Array | null} blogs
 */

/** @type {User} */
const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
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
