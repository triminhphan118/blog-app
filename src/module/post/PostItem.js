import useGetDataWithId from "hooks/useGetDataWithId";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostDecs from "./PostDecs";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-top: 16px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #6b6b6b;
      margin-top: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      margin-top: 16px;
    }
  }
`;

const PostItem = ({ data }) => {
  if (!data?._id) return;
  return (
    <PostItemStyles>
      <PostImage
        url={data.image || ""}
        alt={data.title || ""}
        to={`/${data?.slug}`}
      ></PostImage>
      <PostMeta
        author={data.user?.fullname}
        to={`/${data.user?.username}`}
        date={new Date(data?.createdAt).toLocaleString("vi-Vi")}
      ></PostMeta>
      <PostTitle to={`/${data?.slug}`}>{data.title}</PostTitle>
      <PostDecs>{data.decs}</PostDecs>
      <PostCategory type="secondary">{data.category.name}</PostCategory>
    </PostItemStyles>
  );
};

export default PostItem;
