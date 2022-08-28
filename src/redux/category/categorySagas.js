import { takeLatest } from "redux-saga/effects";
import {
  addCategories,
  deleteCategories,
  getAllCategories,
  getAllCategoriesPage,
  updateCategories,
} from "./categorySlice";
import { requests } from "./requests";
export function* categorySagas() {
  yield takeLatest(getAllCategories.type, requests.getAllCategories);
  yield takeLatest(deleteCategories.type, requests.deleteCategories);
  yield takeLatest(addCategories.type, requests.addNewCategories);
  yield takeLatest(updateCategories.type, requests.updateCategory);
  yield takeLatest(getAllCategoriesPage.type, requests.getAllCategoryPage);
}
