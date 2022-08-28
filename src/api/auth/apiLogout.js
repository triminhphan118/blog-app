import { axiosClient } from "api/axiosClient";

const apiLogout = (user) => {
  const url = "api/v1/auth/logout";
  return axiosClient(user).post(url);
};

export default apiLogout;
