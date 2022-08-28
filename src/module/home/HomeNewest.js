import Heading from "components/layouts/Heading";
import PostItem from "module/post/PostItem";
import PostNewestItem, { PostNewestItemLoad } from "module/post/PostNewestItem";
import PostNewestLarge, {
  PostNewestLargeLoad,
} from "module/post/PostNewestLarge";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAll } from "redux/posts/postsSlice";
import styled from "styled-components";

const NUMBER_POSTSLASTED = 4;
const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
    @media screen and (min-width: 1023px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .sidebar {
    padding: 0 20px 20px;
    border-radius: 16px;
    @media screen and (max-width: 1023px) {
      padding: 0;
    }
  }
`;

const HomeNewest = () => {
  const [postsLasted, setPostLasted] = useState([]);
  const dispatch = useDispatch();
  const {
    postsAll: { posts },
  } = useSelector((state) => state.posts);
  useEffect(() => {
    if (posts && posts.length < 0) {
      dispatch(
        getPostsAll({
          user: {},
        })
      );
    }
  }, []);
  useEffect(() => {
    if (posts && posts.length > 0) {
      let lasted = posts.filter((item) => item.hot !== 1);
      setPostLasted(lasted);
    }
  }, [posts]);
  let loading = postsLasted && postsLasted.length > 0 ? false : true;
  // if (!postsLasted && !postsLasted.length > 0) return;
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          {loading ? (
            <PostNewestLargeLoad></PostNewestLargeLoad>
          ) : (
            <PostNewestLarge post={postsLasted[0]}></PostNewestLarge>
          )}
          <div className="sidebar bg-[#f3edff] dark:bg-[#212122]">
            {loading && (
              <>
                <PostNewestItemLoad></PostNewestItemLoad>
                <PostNewestItemLoad></PostNewestItemLoad>
                <PostNewestItemLoad></PostNewestItemLoad>
              </>
            )}
            {!loading &&
              postsLasted &&
              postsLasted.length > 0 &&
              postsLasted.slice(1, NUMBER_POSTSLASTED).map((item, index) => {
                return (
                  <PostNewestItem key={item._id} post={item}></PostNewestItem>
                );
              })}
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          {postsLasted &&
            postsLasted.length > 0 &&
            postsLasted
              .slice(NUMBER_POSTSLASTED, NUMBER_POSTSLASTED + 8)
              .map((item) => <PostItem data={item} key={item._id}></PostItem>)}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
