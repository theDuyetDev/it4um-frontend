import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";

const AdminNav = ({ onMenuOpenChange }) => {
  const dispatch = useDispatch();
  const adminAuth = useSelector((state) => state.admin.admin);
  const navigate = useNavigate();

  const handleLogout = () => {
    onMenuOpenChange(false);
    dispatch(adminLogout());
    navigate("/");
  };

  return (
    <div className="bg-white absolute top-16 right-6 border w-40 overflow-hidden font-bold z-50">
      <Link
        to="/admin-dashboard/statistic"
        className="flex link pl-2 py-2 items-center gap-3"
        onClick={() => {
          onMenuOpenChange(false);
        }}
      >
        <CgProfile />
        <p>Trang quản lý</p>
      </Link>
      <div className="link pl-2 py-2 " onClick={handleLogout}>
        <div className="flex items-center gap-3 ">
          <IoMdLogOut />
          Đăng xuất
        </div>
        {adminAuth && (
          <p className="text-xs mt-3 mr-12 font-thin italic">
            @{adminAuth.admin.fullname}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminNav;
