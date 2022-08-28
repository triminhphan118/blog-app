import { axiosClient } from "api/axiosClient";

const apiCategory = {
  getAllCategory: (user, params = {}) => {
    const url = "/api/v1/category";
    return axiosClient(user).get(url, {
      params,
    });
  },
  getAllCategoryPage: (user, params = {}) => {
    const url = "/api/v1/category/all";
    return axiosClient({}).get(url, {
      params,
    });
  },
  getCategory: (id) => {
    const url = `/category/${id}`;
    return axiosClient().get(url);
  },
  addCategory: (user, data) => {
    const url = "/api/v1/category/";
    return axiosClient(user).post(url, data);
  },
  upadateCategory: (user, id, data) => {
    const url = `/api/v1/category/${id}`;
    return axiosClient(user).put(url, data);
  },
  deleteCategory: (user, data) => {
    const url = `/api/v1/category/${data}`;
    return axiosClient(user).delete(url);
  },
};

export default apiCategory;
