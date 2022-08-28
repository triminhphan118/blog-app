import { takeLatest } from "redux-saga/effects";
import {
  addPosts,
  deletePosts,
  getAllPosts,
  getPostsAll,
  updatePosts,
} from "./postsSlice";
import { requests } from "./requests";
export function* postSagas() {
  yield takeLatest(getAllPosts.type, requests.getAllPosts);
  yield takeLatest(deletePosts.type, requests.deletePosts);
  yield takeLatest(addPosts.type, requests.addNewPosts);
  yield takeLatest(updatePosts.type, requests.updatePosts);
  yield takeLatest(getPostsAll.type, requests.getPostsAllHome);
}
