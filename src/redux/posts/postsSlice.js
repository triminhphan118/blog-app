const { createSlice } = require("@reduxjs/toolkit");

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postsAll: {},
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setPost: (state, action) => {
      return {
        ...state,
        posts: [...state.categories, action.payload],
      };
    },
    setPostsAll: (state, action) => {
      return {
        ...state,
        postsAll: action.payload,
      };
    },
    getAllPosts: (state, action) => {},
    setPosts: (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    getPostsAll: (state, action) => {},
    addPosts: (state, action) => state,
    deletePosts: (state, aciont) => state,
    updatePosts: (state, aciont) => state,
  },
});

export default postsSlice.reducer;
export const {
  setLoading,
  setPost,
  getAllPosts,
  setPosts,
  addPosts,
  deletePosts,
  updatePosts,
  getPostsAll,
  setPostsAll,
} = postsSlice.actions;
