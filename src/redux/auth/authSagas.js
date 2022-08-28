import { takeLatest } from "redux-saga/effects";
import { login, logout, refreshToken, register } from "./authSlice";
import { requestLogin, requestLogout, requestRegister } from "./requests";
export function* authSagas() {
  yield takeLatest(login.type, requestLogin);
  yield takeLatest(register.type, requestRegister);
  yield takeLatest(logout.type, requestLogout);
}
