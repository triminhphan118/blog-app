import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsAll } from "redux/posts/postsSlice";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children }) {
  return (
    <>
      <div className="bg-gray-100 flex flex-col min-h-screen dark:bg-[#111827] ">
        <div className="bg-white dark:bg-[#111827] dark:text-white">
          <Header></Header>
        </div>
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
export default MainLayout;
