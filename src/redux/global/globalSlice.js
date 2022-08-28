const { createSlice } = require("@reduxjs/toolkit");

const globalSlice = createSlice({
  name: "global",
  initialState: {
    theme: {},
  },
  reducers: {
    setTheme: (state, action) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
  },
});

export default globalSlice.reducer;
export const { setTheme } = globalSlice.actions;
