import LoadingSkeleton from "components/loading/LoadingSkeleton";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostDecs from "./PostDecs";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  box-shadow: 0 0 2px 0 rgba(163, 163, 163, 0.622265);
  padding: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 16px;
  .feature-post {
    width: 100%;
    border-radius: 16px;
    position: relative;
    height: 160px;
    @media screen and (min-width: 1024px) {
      height: 272px;
    }
    .post {
      &-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
      &-overlay {
        position: absolute;
        inset: 0;
        border-radius: 16px;
        background: linear-gradient(
          179.77deg,
          #6b6b6b 36.45%,
          rgba(163, 163, 163, 0.622265) 63.98%,
          rgba(255, 255, 255, 0) 99.8%
        );
        mix-blend-mode: multiply;
        opacity: 0.6;
      }
      &-content {
        position: absolute;
        inset: 0;
        z-index: 10;
        padding: 20px;
        color: white;
      }
      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
    }
  }
  .text-decs {
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 16px 0;
  }
`;
const PostFeatureItem = (props) => {
  const { _id, image, slug, decs, title, createdAt, user, category } =
    props.data;

  const { theme } = useSelector((state) => state.global);

  const fromSecoundsToDate = (secounds) => {
    const date = new Date(secounds);
    return date.toLocaleDateString("vi-VI");
  };

  if (!_id) return;
  return (
    <PostFeatureItemStyles>
      <div className="feature-post">
        <PostImage url={image || ""} to={`/blog/${category?.slug}`}></PostImage>
        <div className="post-overlay"></div>
        <div className="post-content">
          <div className="post-top">
            <PostCategory to={`/blog/${category.slug}`}>
              {category.name || ""}
            </PostCategory>
            <PostMeta
              date={fromSecoundsToDate(createdAt)}
              author={user.fullname}
              to={`/${user.username}`}
            ></PostMeta>
          </div>
          <PostTitle to={`/${slug}`} size="big">
            {title || ""}
          </PostTitle>
        </div>
      </div>
      <PostDecs size="big" className="text-decs dark:text-white" dark={theme}>
        {decs}
      </PostDecs>
    </PostFeatureItemStyles>
  );
};

export const PostFeatureItemLoad = () => {
  return (
    <PostFeatureItemStyles>
      <div className="feature-post">
        <LoadingSkeleton className="h-[272px]"></LoadingSkeleton>
        <div className="post-overlay"></div>
        <div className="post-content">
          <div className="post-top">
            <LoadingSkeleton className="w-[100px] h-[31px]"></LoadingSkeleton>
            <LoadingSkeleton className="w-[150px] h-[21px]"></LoadingSkeleton>
          </div>
          <LoadingSkeleton className="w-[250px] h-[22px]"></LoadingSkeleton>
        </div>
      </div>
      <LoadingSkeleton className="w-[320px] h-[72px] mt-2"></LoadingSkeleton>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
