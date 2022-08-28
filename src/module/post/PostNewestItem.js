import LoadingSkeleton from "components/loading/LoadingSkeleton";
import useGetDataWithId from "hooks/useGetDataWithId";
import React from "react";
import { useSelector } from "react-redux";
import usersSlice from "redux/users/usersSlice";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostDecs from "./PostDecs";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: start;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  margin-top: 12px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      margin-left: auto;
      color: #6b6b6b;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
`;
const PostNewestItem = ({ post }) => {
  if (!post?._id) return;
  return (
    <PostNewestItemStyles>
      <PostImage
        url={post.image || ""}
        alt={post.title || ""}
        to={`/${post?.slug}`}
      ></PostImage>
      <div className="post-content">
        <PostCategory type="secondary">{post.category.name}</PostCategory>
        <PostTitle to={`/${post?.slug}`}>{post.title}</PostTitle>
        <PostDecs>{post.decs}</PostDecs>
        <PostMeta
          author={post.user?.fullname}
          to={`/${post.user?.username}`}
          date={new Date(post?.createdAt).toLocaleString("vi-Vi")}
        ></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export const PostNewestItemLoad = () => {
  return (
    <PostNewestItemStyles>
      <div className="post-content">
        <LoadingSkeleton className="w-[180px] h-[30px]"></LoadingSkeleton>

        <LoadingSkeleton className="w-[107px] h-[31px]  mt-2"></LoadingSkeleton>

        <LoadingSkeleton className="w-[191px] h-[19px]  mt-2"></LoadingSkeleton>
        <LoadingSkeleton className="w-[318px] h-[63px]  mt-2"></LoadingSkeleton>

        <LoadingSkeleton className="w-[210px] h-[21px]  mt-2"></LoadingSkeleton>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
