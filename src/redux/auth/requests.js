import { call, put } from "redux-saga/effects";
import { setLoading, setUser } from "./authSlice";
import apiLogin from "api/auth/apiLogin";
import apiRegister from "api/auth/apiRegister";
import { toast } from "react-toastify";
import apiLogout from "api/auth/apiLogout";

export function* requestLogin(action) {
  yield put(setLoading(true));
  try {
    const userLogin = yield call(apiLogin, action.payload);
    yield put(setUser(userLogin));
    yield put(setLoading(false));
    toast.success("Login success.", {
      pauseOnHover: false,
      autoClose: 1000,
    });
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
}

export function* requestRegister(action) {
  yield put(setLoading(true));
  try {
    const userCreate = yield call(apiRegister, action.payload);
    toast.success("Register success.", {
      pauseOnHover: false,
      autoClose: 1000,
    });
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
    if (error?.response?.message) {
    }
    yield put(setLoading(false));
  }
}
export function* requestLogout(action) {
  try {
    yield call(apiLogout);
    yield put(setUser({}));
  } catch (error) {
    console.log(error);
    if (error?.response?.message) {
    }
  }
}
