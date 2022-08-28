import { call, put, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import { setLoading, setPosts, setPostsAll } from "./postsSlice";
import apiPosts from "api/posts/apiPosts";
export const requests = {
  getAllPosts: function* (action) {
    try {
      const posts = yield call(
        apiPosts.getAllPosts,
        action.payload.user,
        action.payload.params
      );
      yield put(setPosts(posts));
    } catch (error) {
      console.log(error);
    }
  },
  getPostsAllHome: function* (action) {
    yield put(setLoading(true));
    try {
      const posts = yield call(
        apiPosts.getPostsAllHome,
        {},
        action.payload.params
      );
      yield put(setPostsAll(posts));
      yield put(setLoading(false));
    } catch (error) {
      console.log(error);
      yield put(setLoading(false));
    }
  },
  deletePosts: function* (action) {
    try {
      const posts = yield call(
        apiPosts.deletePost,
        action.payload.user,
        action.payload.id
      );
      toast.success("Delete successfully.");
      yield put(setPosts(posts));
    } catch (error) {
      console.log(error);
    }
  },
  addNewPosts: function* (action) {
    yield put(setLoading(true));
    try {
      const post = yield call(
        apiPosts.addPost,
        action.payload.user,
        action.payload.value
      );
      yield put(setPosts(post));
      yield put(setLoading(false));
      toast.success("Add new category successfully.");
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
  updatePosts: function* (action) {
    yield put(setLoading(true));
    try {
      const response = yield call(
        apiPosts.upadatePost,
        action.payload.user,
        action.payload.id,
        action.payload.value
      );
      const {
        posts: { posts },
      } = yield select();
      const newPost = posts.posts.filter((item) => {
        return item._id !== response._id;
      });
      yield put(setPosts({ ...posts, posts: [...newPost, response] }));
      yield put(setLoading(false));
      toast.success("update post successfully.");
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
