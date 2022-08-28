import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 5px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  span {
    display: none;
    @media screen and (max-width: 1023px) {
      display: block;
      justify-self: start;
      margin-right: auto;
      padding: 12px;
      cursor: pointer;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = ({ onClickSidibar = () => {} }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <DashboardHeaderStyles>
      <span onClick={onClickSidibar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </span>
      <Button
        to="/manage/add-post"
        className="header-button"
        kind="green"
        height="40px"
      >
        New post
      </Button>
      <div className="header-avatar">
        <Link to={"/manage/profile-user"}>
          <img src={user?.avatar} alt="" />
        </Link>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
