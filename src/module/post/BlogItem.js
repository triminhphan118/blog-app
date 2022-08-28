import { Button } from "components/button";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostsAll } from "redux/posts/postsSlice";
import PostItem from "./PostItem";

const ITEM_PER_PAGE = 6;
function BlogItem() {
  const [postsCate, setPostsCate] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(ITEM_PER_PAGE);
  const params = useParams("");
  const dispatch = useDispatch();
  const {
    postsAll: { posts },
  } = useSelector((state) => state.posts);
  useEffect(() => {
    if (posts && posts.length < 0) {
      dispatch(
        getPostsAll({
          user: {},
        })
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (posts && posts.length > 0) {
      let postsCate = posts.filter((item) =>
        params?.slug ? item.category.slug === params?.slug : true
      );
      setPostsCate(postsCate);

      return () => {
        setItemPerPage(ITEM_PER_PAGE);
      };
    }
  }, [params?.slug, posts]);
  const loading = !postsCate || postsCate.length < 1 ? true : false;

  const loadMore =
    itemPerPage > ITEM_PER_PAGE && itemPerPage >= postsCate.length
      ? true
      : false;
  return (
    <div className="post-related my-10">
      <div className="layout_grid">
        <div className="grid-layout grid-layout--secondary">
          {postsCate &&
            postsCate.length > 0 &&
            postsCate.slice(0, itemPerPage).map((item) => {
              return <PostItem data={item} key={item._id}></PostItem>;
            })}
        </div>
      </div>
      {postsCate.length > ITEM_PER_PAGE && (
        <div className="flex justify-center mt-10">
          <Button
            onClick={() => setItemPerPage((prev) => prev + ITEM_PER_PAGE)}
            kind="amber"
            disabled={loadMore}
            style={{
              with: "200px",
              height: "50px",
            }}
          >
            {loadMore ? "Dữ liệu hết rồi!" : "Xem thêm"}
          </Button>
        </div>
      )}
      {!postsCate ||
        (postsCate.length < 1 && (
          <div className="flex justify-center ">
            <Button disabled={true} kind="teal">
              Không có dữ liệu
            </Button>
          </div>
        ))}
    </div>
  );
}
export default BlogItem;
