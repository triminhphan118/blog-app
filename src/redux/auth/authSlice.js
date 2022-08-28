import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    login: (state, action) => {
      return state;
    },
    register: (state, action) => {
      return state;
    },
    setTokenNew: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload,
        },
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        user: {},
      };
    },
  },
});

export default authSlice.reducer;
export const { login, setLoading, register, setUser, setTokenNew, logout } =
  authSlice.actions;
