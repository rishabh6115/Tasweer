import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  allusers: [],
  loggedUser: null,
  isAuthenticated: false,
  loading: false,
  error: false,
  notification: "",
  apploading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setAllUser(state, action) {
      state.allusers = action.payload;
    },
    getAllUser() {},
    setLoggedUser(state, action) {
      state.loggedUser = action.payload;
    },
    getLoggedUser() {},
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    getLoggedData() {},
    logout() {},
    login() {},
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setAppLoading(state, action) {
      state.apploading = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
