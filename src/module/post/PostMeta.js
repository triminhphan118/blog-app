import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  margin-top: auto;
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
  .post-author {
    transition: 0.3s;
    &:hover {
      color: #fbbf24;
    }
  }

  ${(props) =>
    props.dark === "dark" &&
    css`
      color: white;
    `}
`;
function PostMeta({
  date = "Mar 13",
  author = "Andiiez Le",
  className = "",
  to = "",
}) {
  const { theme } = useSelector((state) => state.global);
  return (
    <PostMetaStyles className={`post-meta ${className}`} dark={theme}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink to={`/user${to}`}>
        <span className="post-author">{author}</span>
      </NavLink>
    </PostMetaStyles>
  );
}

export default PostMeta;
