import Heading from "components/layouts/Heading";
import MainLayout from "components/layouts/MainLayout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styled from "styled-components";
import PostAuthor from "components/author/PostAuthor";
import PostRelated from "module/post/PostRelated";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAll } from "redux/posts/postsSlice";
import PostDecs from "module/post/PostDecs";

const PostDetailsPageStyles = styled.div`
  min-height: 100%;
  .post {
    margin-top: 30px;

    &-header {
      margin: 30px 0;
    }
    &-feature {
      width: 100%;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
    }
    &-info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }
    &-content {
      max-width: 900px;
      margin: 80px auto;
      span {
        display: block;
        padding: 20px;
        border-radius: 8px;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const dispatch = useDispatch();
  const {
    postsAll: { posts },
  } = useSelector((state) => state.posts);
  useEffect(() => {
    if (posts.length > 0) {
      let postDetail = posts.find((item) => item.slug === params.slug);
      if (postDetail?._id) {
        setPost(postDetail);
      } else {
        dispatch(
          getPostsAll({
            user: {},
          })
        );
      }
    }
  }, [params.slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [params]);
  if (!post?._id) return;
  return (
    <PostDetailsPageStyles>
      <MainLayout>
        <div className="container">
          <div className="post-header">
            <PostImage url={post.image} className="post-feature"></PostImage>
          </div>
          <div className="post-info">
            <PostCategory type="secondary" className="">
              {post?.category?.name || ""}
            </PostCategory>

            <PostMeta
              author={post.user?.fullname || ""}
              date={new Date(post.createdAt).toLocaleString("vi-VI")}
            ></PostMeta>
          </div>
          <div>
            <h1 className="post-heading">{post.title || ""}</h1>
            <PostDecs size="big">{post.decs}</PostDecs>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(post.content || "")}</div>
            <PostAuthor userID={post.user.id}></PostAuthor>
          </div>
          <PostRelated categoryId={post?.category.id}></PostRelated>
        </div>
      </MainLayout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
