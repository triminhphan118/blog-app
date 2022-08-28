import authSlice from "./auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import categorySlice from "./category/categorySlice";
import postsSlice from "./posts/postsSlice";
import usersSlice from "./users/usersSlice";
import globalSlice from "./global/globalSlice";

const reducer = combineReducers({
  auth: authSlice,
  category: categorySlice,
  posts: postsSlice,
  user: usersSlice,
  global: globalSlice,
});
export default reducer;
