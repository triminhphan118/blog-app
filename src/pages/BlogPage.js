import MainLayout from "components/layouts/MainLayout";
import PostCategory from "module/post/PostCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getAllCategoriesPage } from "redux/category/categorySlice";
import { status } from "utils/constants";

function BlogPage() {
  const [categories, setCategories] = useState([]);
  const { categoriesPage = [] } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    if (categoriesPage.length < 1) {
      dispatch(
        getAllCategoriesPage({
          user: {},
        })
      );
    }
  }, []);
  const loading = categoriesPage.length > 0 ? false : true;
  return (
    <MainLayout>
      <div className="container">
        {loading ? (
          <div className="loading-line"></div>
        ) : (
          <div>
            <div className="flex gap-4 mt-8 flex-wrap">
              {categoriesPage.length > 0 &&
                categoriesPage.map((item) => (
                  <PostCategory
                    to={`/blog/${item.slug}`}
                    key={item._id}
                    type="green"
                  >
                    {item.name}{" "}
                  </PostCategory>
                ))}
            </div>
          </div>
        )}
        {<Outlet></Outlet>}
      </div>
    </MainLayout>
  );
}
export default BlogPage;
