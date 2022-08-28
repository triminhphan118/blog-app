import { axiosClient } from "api/axiosClient";

const apiRegister = (user) => {
  console.log("api", user);
  const url = "api/v1/auth/register";
  return axiosClient().post(url, user);
};

export default apiRegister;
