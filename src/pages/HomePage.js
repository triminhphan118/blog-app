import { axiosClient } from "api/axiosClient";
import axios from "axios";
import MainLayout from "components/layouts/MainLayout";
import Banner from "module/home/Banner";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNewest";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPostsAll } from "redux/posts/postsSlice";

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPostsAll({
        user: {},
      })
    );
  }, []);
  return (
    <MainLayout>
      <Banner></Banner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </MainLayout>
  );
}

export default HomePage;
