import { all, fork } from "redux-saga/effects";
import { authSagas } from "./auth/authSagas";
import { categorySagas } from "./category/categorySagas";
import { postSagas } from "./posts/postSagas";
import { userSagas } from "./users/userSagas";
function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(categorySagas),
    fork(postSagas),
    fork(userSagas),
  ]);
}

export default rootSaga;
