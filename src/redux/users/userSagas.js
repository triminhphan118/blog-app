import { takeLatest } from "redux-saga/effects";
import { requests } from "./requests";
import { addUsers, deleteUsers, getAllUsers, updateUsers } from "./usersSlice";
export function* userSagas() {
  yield takeLatest(getAllUsers.type, requests.getAllUsers);
  yield takeLatest(deleteUsers.type, requests.deleteUsers);
  yield takeLatest(addUsers.type, requests.addNewUser);
  yield takeLatest(updateUsers.type, requests.updateUsers);
}
