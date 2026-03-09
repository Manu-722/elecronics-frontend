import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state.user = user;
      state.role = user?.role || "user";   // ensure role always exists
      state.isAuthenticated = true;        // auto-authenticate when user is set
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setToken, setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;