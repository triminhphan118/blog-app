import axios from "axios";
import jwtDecode from "jwt-decode";
import { logout, setTokenNew } from "redux/auth/authSlice";
import store from "../redux/configureStore";

let refreshTokenCheck = null;
axios.defaults.withCredentials = true;

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "https://blog-app-pmt.herokuapp.com/api/v1/auth/refresh",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const axiosClient = (user = {}) => {
  const axiosJWT = axios.create({
    baseURL: "https://blog-app-pmt.herokuapp.com/",
    headers: {
      "Content-Type": "application/json",
    },
    id: user._id,
    withCredentials: true,
  });

  // RESQUEST
  axiosJWT.interceptors.request.use(
    async (config) => {
      let newToken = null;
      let check = true;
      if (Object.keys(user).length > 0) {
        let time = new Date().getTime() / 1000;
        if (user.accessToken) {
          let tokenDecoded = jwtDecode(user.accessToken);
          check = tokenDecoded.exp < time;
        } else {
          // store.dispatch(logout());
        }
        if (check) {
          refreshTokenCheck = refreshTokenCheck
            ? refreshTokenCheck
            : refreshToken(user);
          newToken = await refreshTokenCheck;
          refreshTokenCheck = null;
          store.dispatch(setTokenNew(newToken));
        }
      }
      config.headers["token"] = `Bearer ${newToken || user.accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // RESPONSE
  axiosJWT.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response.data;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return axiosJWT;
};
