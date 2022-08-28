import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

const PostDecsStyles = styled.div`
  font-weight: 300;
  line-height: 1.5;
  display: block;
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 14px;
    `}
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 16px;
    `}
  ${(props) =>
    props.dark === "dark" &&
    css`
      color: white;
    `}
`;
function PostDecs({
  className = "",
  children,
  to = "/",
  size = "normal",
  dark,
}) {
  const { theme } = useSelector((state) => state.global);
  return (
    <PostDecsStyles
      className={`post-title  ${className}`}
      size={size}
      dark={theme}
    >
      {children}
    </PostDecsStyles>
  );
}

export default PostDecs;
