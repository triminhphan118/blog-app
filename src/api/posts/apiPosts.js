import { axiosClient } from "api/axiosClient";

const apiPosts = {
  getAllPosts: (user, params = {}) => {
    const url = "/api/v1/posts";
    return axiosClient(user).get(url, {
      params,
    });
  },
  getPostsAllHome: (user, params = {}) => {
    const url = "/api/v1/posts/all";
    return axiosClient({}).get(url, {
      params,
    });
  },
  getPost: (id) => {
    const url = `/api/v1/post/${id}`;
    return axiosClient().get(url);
  },
  addPost: (user, data) => {
    const url = "/api/v1/posts/";
    return axiosClient(user).post(url, data);
  },
  upadatePost: (user, id, data) => {
    const url = `/api/v1/posts/${id}`;
    return axiosClient(user).put(url, data);
  },
  deletePost: (user, data) => {
    const url = `/api/v1/posts/${data}`;
    return axiosClient(user).delete(url);
  },
};

export default apiPosts;
