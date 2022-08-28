import LoadingSkeleton from "components/loading/LoadingSkeleton";
import useGetDataWithId from "hooks/useGetDataWithId";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostDecs from "./PostDecs";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      margin-left: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const PostNewestLarge = ({ post }) => {
  if (!post?._id) return;
  return (
    <PostNewestLargeStyles>
      <PostImage
        url={post.image || ""}
        alt={post.title || ""}
        to={`/${post?.slug}`}
      ></PostImage>
      <PostCategory type="secondary">{post.category.name}</PostCategory>
      <PostTitle to={`/${post?.slug}`} size="big">
        {post.title}
      </PostTitle>
      <PostDecs>{post.decs}</PostDecs>
      <PostMeta
        author={post.user?.fullname}
        to={`/${post.user?.username}`}
        date={new Date(post?.createdAt).toLocaleString("vi-Vi")}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export const PostNewestLargeLoad = () => {
  return (
    <PostNewestLargeStyles>
      <LoadingSkeleton className="w-[558px] h-[433px]"></LoadingSkeleton>
      <LoadingSkeleton className="w-[107px] h-[31px] mt-2"></LoadingSkeleton>
      <LoadingSkeleton className="w-[250px] h-[22px]  mt-2"></LoadingSkeleton>
      <LoadingSkeleton className="w-[558px] h-[42px]  mt-2"></LoadingSkeleton>
      <LoadingSkeleton className="w-[300px] h-[21px]  mt-2"></LoadingSkeleton>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
