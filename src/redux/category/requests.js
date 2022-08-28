import { call, put, select } from "redux-saga/effects";
import apiCategory from "api/category/apiCategory";
import {
  setCategories,
  setCategory,
  setCategoryPage,
  setLoading,
} from "./categorySlice";
import { toast } from "react-toastify";
export const requests = {
  getAllCategories: function* (action) {
    try {
      const categories = yield call(
        apiCategory.getAllCategory,
        action.payload.user,
        action.payload.params
      );
      yield put(setCategories(categories));
    } catch (error) {
      console.log(error);
    }
  },

  getAllCategoryPage: function* (action) {
    yield put(setLoading(true));
    try {
      const category = yield call(
        apiCategory.getAllCategoryPage,
        {},
        action.payload.params
      );
      console.log(category);
      yield put(setCategoryPage(category));
      yield put(setLoading(false));
    } catch (error) {
      console.log(error);
      yield put(setLoading(false));
    }
  },
  deleteCategories: function* (action) {
    try {
      const categories = yield call(
        apiCategory.deleteCategory,
        action.payload.user,
        action.payload.id
      );
      toast.success("Delete successfully.");
      yield put(setCategories(categories));
    } catch (error) {
      console.log(error);
    }
  },
  addNewCategories: function* (action) {
    yield put(setLoading(true));
    try {
      const categories = yield call(
        apiCategory.addCategory,
        action.payload.user,
        action.payload.value
      );
      yield put(setCategory(categories));
      yield put(setLoading(false));
      toast.success("Add new category successfully.");
    } catch (error) {
      console.log(error);
      if (error?.response?.data) {
        toast.error(error.response.data, {
          pauseOnHover: false,
          autoClose: 1000,
        });
      }
      yield put(setLoading(false));
    }
  },
  updateCategory: function* (action) {
    yield put(setLoading(true));
    try {
      const response = yield call(
        apiCategory.upadateCategory,
        action.payload.user,
        action.payload.id,
        action.payload.value
      );
      const {
        category: { categories },
      } = yield select();
      const newCate = categories.categories.filter((item) => {
        return item._id !== response._id;
      });
      yield put(
        setCategories({ ...categories, categories: [...newCate, response] })
      );
      yield put(setLoading(false));
      toast.success("Add new category successfully.");
    } catch (error) {
      console.log(error);
      if (error?.response?.data) {
        toast.error(error.response.data, {
          pauseOnHover: false,
          autoClose: 1000,
        });
      }
      yield put(setLoading(false));
    }
  },
};
