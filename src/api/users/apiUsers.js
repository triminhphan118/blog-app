import { axiosClient } from "api/axiosClient";

const apiUsers = {
  getAllUsers: (user, params = {}) => {
    const url = "/api/v1/user";
    return axiosClient(user).get(url, {
      params,
    });
  },
  getUser: (id) => {
    const url = `/api/v1/user/${id}`;
    return axiosClient().get(url);
  },
  addUser: (user, data) => {
    const url = "/api/v1/user/";
    return axiosClient(user).post(url, data);
  },
  upadateUser: (user, id, data) => {
    const url = `/api/v1/user/${id}`;
    return axiosClient(user).put(url, data);
  },
  deleteUser: (user, data) => {
    const url = `/api/v1/user/${data}`;
    return axiosClient(user).delete(url);
  },
};

export default apiUsers;
