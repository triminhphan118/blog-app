import { call, put, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import apiUsers from "api/users/apiUsers";
import { setLoading, setUsers } from "./usersSlice";
import Swal from "sweetalert2";
import { setUser } from "redux/auth/authSlice";
export const requests = {
  getAllUsers: function* (action) {
    try {
      const users = yield call(
        apiUsers.getAllUsers,
        action.payload.user,
        action.payload.params
      );
      yield put(setUsers(users));
    } catch (error) {
      console.log(error);
    }
  },
  deleteUsers: function* (action) {
    try {
      const users = yield call(
        apiUsers.deleteUser,
        action.payload.user,
        action.payload.id
      );
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      yield put(setUsers(users));
    } catch (error) {
      console.log(error);
    }
  },
  addNewUser: function* (action) {
    yield put(setLoading(true));
    try {
      const user = yield call(
        apiUsers.addUser,
        action.payload.user,
        action.payload.value
      );
      toast.success("Add new user successfully.");
      yield put(setUser(user));
      yield put(setLoading(false));
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data, {
          pauseOnHover: false,
          autoClose: 1000,
        });
      }
      yield put(setLoading(false));
    }
  },
  updateUsers: function* (action) {
    yield put(setLoading(true));
    try {
      const response = yield call(
        apiUsers.upadateUser,
        action.payload.user,
        action.payload.id,
        action.payload.value
      );
      const {
        user: { users },
      } = yield select();
      const newUser = users.users.filter((item) => {
        return item._id !== response._id;
      });
      if (action.payload.type && action.payload.type === "profile") {
        yield put(setUser(response));
      }
      yield put(setUsers({ ...users, users: [...newUser, response] }));
      yield put(setLoading(false));
      toast.success("Update user successfully.");
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
