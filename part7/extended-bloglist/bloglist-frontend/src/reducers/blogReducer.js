import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setAllBlog(state, action) {
      console.log(action.payload);

      return action.payload;
    },
    setOneBlog(state, action) {
      console.log(action.payload);
      console.log("state", state);

      state.push(action.payload);
    },
  },
});

export const { setAllBlog, setOneBlog } = blogSlice.actions;

export default blogSlice.reducer;
