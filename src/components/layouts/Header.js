import { Button } from "components/button";
import ToggleV2 from "components/toggle/ToggleV2";
import useDarkMode from "hooks/useDarkMode";

import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, setUser } from "redux/auth/authSlice";
import { getPostsAll } from "redux/posts/postsSlice";
import styled from "styled-components";

const HeaderStyles = styled.div`
  /* padding: 20px 0; */
  margin-top: 10px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  .header-main {
    display: flex;
  }
  .img {
    max-width: 50px;
    border-radius: 8px;
    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-left: 30px;
    li {
      list-style: none;
    }
  }
  .header-action {
    margin-left: auto;
    display: flex;
    .header-auth {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-right: 10px;
    }
  }

  .menu-link {
    font-size: 18px;
    font-weight: 500;
  }
`;
const menuLinks = [
  {
    title: "Bài viết",
    url: "/blog",
  },
];

function getLastName(name) {
  if (!name) return "User";
  const splitName = name.split(" ");
  return splitName[splitName.length - 1];
}

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, setThemeValue } = useDarkMode();
  const { theme: themeValue } = useSelector((state) => state.global);
  const handleLogout = () => {
    if (user?.accessToken) {
      dispatch(logout(user));
    } else {
      dispatch(setUser({}));
      navigate("/");
    }
  };
  useEffect(() => {
    dispatch(
      getPostsAll({
        user: {},
      })
    );
  }, []);
  return (
    <div className="container">
      <HeaderStyles>
        <div className="header-main">
          <NavLink to="/" className="img">
            <img src="/Blog.png" alt="" />
            {/* <img src="/PMT.png" alt="" /> */}
          </NavLink>
          <ul className="menu">
            {menuLinks.length > 0 &&
              menuLinks.map((item) => (
                <li className="menu-item" key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
        <div className="header-action">
          {user && user?._id ? (
            <div className="header-auth">
              Xin Chào!{" "}
              <strong className="text-primary">
                {getLastName(user?.fullname)}
              </strong>
              <Button
                kind="teal"
                type="button"
                height="35px"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </Button>
              <Button
                type="button"
                height="35px"
                kind="amber"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              to="/sign-up"
              kind={"blue"}
              height="45px"
              style={{ marginRight: "10px" }}
            >
              Đăng ký
            </Button>
          )}
          <ToggleV2
            onChange={() => {
              setThemeValue(themeValue === "light" ? "dark" : "light");
            }}
            on={theme === "light" ? false : true}
          >
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </ToggleV2>
        </div>
      </HeaderStyles>
    </div>
  );
}

export default Header;
