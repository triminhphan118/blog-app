const { createSlice } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setUser: (state, action) => {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    },
    getAllUsers: (state, action) => {},
    setUsers: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    addUsers: (state, action) => state,
    deleteUsers: (state, aciont) => state,
    updateUsers: (state, aciont) => state,
  },
});

export default usersSlice.reducer;
export const {
  setLoading,
  setUser,
  setUsers,
  deleteUsers,
  getAllUsers,
  addUsers,
  updateUsers,
} = usersSlice.actions;
