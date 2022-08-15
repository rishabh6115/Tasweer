import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts() {},
    setAllPosts(state, action) {
      state.allPosts = action.payload;
    },
  },
});

export const { getPosts, setAllPosts } = postSlice.actions;

export default postSlice.reducer;
