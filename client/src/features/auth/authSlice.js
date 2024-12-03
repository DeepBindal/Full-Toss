import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const userFromStorage = JSON.parse(localStorage.getItem("user")) || {};
const accessTokenFromStorage = localStorage.getItem("accessToken") || "";
const isAuthenticatedFromStorage = !!accessTokenFromStorage;

const initialState = {
  user: userFromStorage,
  isAuthenticated: isAuthenticatedFromStorage,
  accessToken: accessTokenFromStorage,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.isAuthenticated = true;
      state.accessToken = accessToken;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.accessToken = "";

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
    updateUser : (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
