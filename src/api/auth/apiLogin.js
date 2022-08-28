import { axiosClient } from "api/axiosClient";

const apiLogin = (user) => {
  const url = "/api/v1/auth/login";
  return axiosClient().post(url, user);
};
export default apiLogin;
