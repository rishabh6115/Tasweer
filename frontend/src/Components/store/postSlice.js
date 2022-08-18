import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: null,
  postRequestLoading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts() {},
    setAllPosts(state, action) {
      state.allPosts = action.payload;
    },
    setPostRequestLoading(state, action) {
      state.postRequestLoading = action.payload;
    },
  },
});

export const { getPosts, setAllPosts, setPostRequestLoading } =
  postSlice.actions;

export default postSlice.reducer;
