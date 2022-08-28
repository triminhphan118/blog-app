import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect } from "react";
import { useState } from "react";
import { status } from "utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategories,
  getAllCategories,
} from "redux/category/categorySlice";
import ReactPaginate from "react-paginate";

const CATEGORY_PER_PAGE = 5;
const CategoryManage = () => {
  const [keyword, setkeyword] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    categories: { total, categories },
  } = useSelector((state) => state.category);
  useEffect(() => {
    if (user) {
      dispatch(
        getAllCategories({
          user: user,
          params: {
            page: pageCurrent,
            limit: CATEGORY_PER_PAGE,
            q: keyword,
          },
        })
      );
    }
  }, [dispatch, user, pageCurrent, CATEGORY_PER_PAGE, keyword]);

  // PAGINATION
  useEffect(() => {
    setPageCount(Math.ceil(total / CATEGORY_PER_PAGE));
  }, [total]);

  const handleDeleteItem = (id) => {
    if (!id) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      dispatch(
        deleteCategories({
          user: user,
          id,
        })
      );
    });
  };
  const handleInputSearch = debounce((e) => {
    if (pageCurrent !== 1) {
      setPageCurrent(1);
    }
    setkeyword(e.target.value);
  }, 800);
  const handlePageClick = (event) => {
    setPageCurrent(event.selected + 1);
  };

  return (
    <div>
      <div className="flex justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage your category"
        ></DashboardHeading>
        <Button
          to="/manage/add-category"
          kind="teal"
          style={{ height: "50px" }}
        >
          Add Category
        </Button>
      </div>
      <div className="my-2 text-right">
        <input
          type="text"
          className="py-3 px-5  border border-gray-300 rounded-md"
          placeholder="Search name category"
          // value={keyword}
          onChange={handleInputSearch}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.length > 0 &&
            categories.map((item) => {
              return (
                <tr key={item._id}>
                  <td title={item._id}>{item._id.slice(0, 5) + "..."}</td>
                  <td>{item.name}</td>
                  <td>
                    <span className="italic text-gray-400">{item.slug}</span>
                  </td>
                  <td>
                    {item.status === status.Approved && (
                      <LabelStatus type="success"> Approved</LabelStatus>
                    )}
                    {item.status === status.UnApproved && (
                      <LabelStatus type="danger"> UnApproved</LabelStatus>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-x-2">
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-category?id=${item._id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteItem(item._id)}
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

export default CategoryManage;
