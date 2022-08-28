import { ActionDelete, ActionEdit } from "components/action";
import { Button } from "components/button";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";

import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUsers } from "redux/users/usersSlice";
import Swal from "sweetalert2";
import { roleUser, statusUser } from "utils/constants";

const USER_PER_PAGE = 3;
const UserManage = () => {
  const [keyword, setkeyword] = useState("");
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();
  const {
    users: { total, users },
  } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllUsers({
        user,
        params: {
          page: pageCurrent,
          limit: USER_PER_PAGE,
          q: keyword,
        },
      })
    );
  }, [dispatch, keyword, pageCurrent, user]);
  useEffect(() => {
    setPageCount(Math.ceil(total / USER_PER_PAGE));
  }, [total]);
  const renderStatusUser = (status) => {
    switch (status) {
      case statusUser.Active:
        return <LabelStatus type="success">Active</LabelStatus>;
      case statusUser.Pending:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case statusUser.Ban:
        return <LabelStatus type="danger">Ban</LabelStatus>;

      default:
        break;
    }
  };
  const renderRoleUser = (role) => {
    switch (role) {
      case roleUser.Admin:
        return "Admin";
      case roleUser.Mod:
        return "Moderator";
      case roleUser.User:
        return "User";
      default:
        break;
    }
  };

  const handleDeleteUser = (user) => {
    if (!user?._id) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteUsers({
            user,
            id: user._id,
          })
        );
      }
    });
  };
  const handleInputSearch = debounce((e) => {
    if (pageCurrent !== 1) {
      setPageCurrent(1);
    }
    setkeyword(e.target.value);
  }, 500);

  const handlePageClick = (event) => {
    setPageCurrent(event.selected + 1);
  };

  return (
    <div>
      <div className="flex justify-between">
        <DashboardHeading
          title="Users"
          desc="Manage your user"
        ></DashboardHeading>
        <Button to="/manage/add-user" kind="teal" style={{ height: "50px" }}>
          Add user
        </Button>
      </div>
      <div className="my-2 text-right">
        <input
          type="text"
          className="py-3 px-5  border border-gray-300 rounded-md"
          placeholder="Search name user"
          // value={keyword}
          onChange={handleInputSearch}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Info</th>
            <th>Email</th>
            <th>Username</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-start gap-x-2">
                      <img
                        src={item?.avatar}
                        alt={item.fullname}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      <div className="flex flex-col gap-2">
                        <span>{item.fullname}</span>
                        <span className="text-gray-400 text-sm">
                          {new Date(item.createdAt).toLocaleDateString("vi-VI")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td title={item.email}>{item.email.slice(0, 5) + "..."}</td>
                  <td>{item.username}</td>
                  <td>{renderStatusUser(item.status)}</td>
                  <td>{renderRoleUser(item.role)}</td>
                  <td>
                    <div className="flex items-center gap-x-2">
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-user?id=${item._id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteUser(item)}
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

export default UserManage;
