import Heading from "components/layouts/Heading";
import PostFeatureItem, {
  PostFeatureItemLoad,
} from "module/post/PostFeatureItem";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAll } from "redux/posts/postsSlice";
import styled from "styled-components";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const dispatch = useDispatch();
  const [postNew, setPostNew] = useState([]);
  const {
    postsAll: { posts },
  } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(
      getPostsAll({
        user: {},
      })
    );
  }, []);
  useEffect(() => {
    if (posts && posts.length > 0) {
      let postNew = posts.filter((item) => item.hot === 1);
      setPostNew(postNew);
    }
  }, [posts]);
  let loading = postNew && postNew.length > 0 ? false : true;
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {loading && (
            <>
              <PostFeatureItemLoad></PostFeatureItemLoad>
              <PostFeatureItemLoad></PostFeatureItemLoad>
              <PostFeatureItemLoad></PostFeatureItemLoad>
            </>
          )}
          {!loading &&
            postNew
              .slice(0, 3)
              .map((item) => (
                <PostFeatureItem key={item._id} data={item}></PostFeatureItem>
              ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
