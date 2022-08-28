import NotFoundPage from "pages/NotFoundPage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, setUser } from "redux/auth/authSlice";
import styled from "styled-components";
import { roleUser } from "utils/constants";
import DashboardHeader from "./DashBoardHeader";
import Sidebar from "./Sidebar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
      @media screen and (max-width: 1023px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [sidebar, setSidebar] = useState(false);

  // useEffect(() => {
  //   if (user?.accessToken) {
  //     dispatch(logout(user));
  //   } else {
  //     dispatch(setUser({}));
  //     navigate("/");
  //   }
  // }, []);
  if (!user?._id) return <NotFoundPage></NotFoundPage>;

  return (
    <DashboardStyles>
      <DashboardHeader
        onClickSidibar={() => setSidebar((prev) => !prev)}
      ></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar
          showSidebar={sidebar}
          onClickSidibar={() => setSidebar((prev) => !prev)}
        ></Sidebar>
        <div className="dashboard-children">
          {user?.role === roleUser.User ? null : <Outlet></Outlet>}
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
