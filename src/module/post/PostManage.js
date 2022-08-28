import { ActionDelete, ActionEdit, ActionView } from "components/action";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";

import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePosts, getAllPosts } from "redux/posts/postsSlice";
import { status, statusPost } from "utils/constants";

const POST_PER_PAGE = 3;
const PostManage = () => {
  const [keyword, setKeyword] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();
  const {
    posts: { total, posts },
  } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllPosts({
        user,
        params: {
          page: pageCurrent,
          limit: POST_PER_PAGE,
          q: keyword,
        },
      })
    );
  }, [dispatch, keyword, pageCurrent, user]);
  useEffect(() => {
    setPageCount(Math.ceil(total / POST_PER_PAGE));
  }, [total]);
  const handleSearch = debounce((e) => {
    if (pageCurrent !== 1) {
      setPageCurrent(1);
    }
    setKeyword(e.target.value);
  }, 500);
  const handleDeltePost = (item) => {
    if (!item?._id) return;
    dispatch(
      deletePosts({
        user,
        id: item._id,
      })
    );
  };
  const renderStatus = (status) => {
    switch (+status) {
      case statusPost.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case statusPost.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case statusPost.REJECT:
        return <LabelStatus type="danger">Reject</LabelStatus>;
      default:
        break;
    }
  };

  const renderHot = (hot) => {
    switch (+hot) {
      case status.Approved:
        return <LabelStatus type="success">Hot</LabelStatus>;
      default:
        break;
    }
  };

  const handlePageClick = (event) => {
    setPageCurrent(event.selected + 1);
  };

  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.length > 0 &&
            posts.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-[66px] h-[55px] rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <time className="text-sm text-gray-500">
                          Date:{" "}
                          {new Date(item.createdAt).toLocaleDateString("vi-VI")}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">{item.category?.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{item.user?.fullname}</span>
                  </td>
                  <td>
                    <div className="flex flex-col gap-y-2">
                      {renderStatus(item.status)}
                      {renderHot(item.hot)}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3 text-gray-500">
                      <ActionView
                        onClick={() => navigate(`/${item.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${item._id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeltePost(item)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {pageCount > 1 && (
        <div className="mt-10">
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="previous"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
};

export default PostManage;
