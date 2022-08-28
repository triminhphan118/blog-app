const { createSlice } = require("@reduxjs/toolkit");

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    categoriesPage: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setCategory: (state, action) => {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    },
    getAllCategories: (state, action) => {},
    setCategoryPage: (state, action) => {
      return {
        ...state,
        categoriesPage: action.payload,
      };
    },
    getAllCategoriesPage: (state, action) => {},
    setCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
    addCategories: (state, action) => state,
    deleteCategories: (state, aciont) => state,
    updateCategories: (state, aciont) => state,
  },
});

export default categorySlice.reducer;
export const {
  getAllCategories,
  setCategories,
  deleteCategories,
  addCategories,
  setLoading,
  setCategory,
  updateCategories,
  getAllCategoriesPage,
  setCategoryPage,
} = categorySlice.actions;
