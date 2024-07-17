import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaPen, FaUserEdit, FaLock } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

const SideBar = () => {
  return (
    <div className="w-48 h-screen bg-white border-r-2">
      <div className="p-4">
        <h2 className="text-blue-700 text-lg font-semibold mb-4">
          Bảng điều khiển
        </h2>
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard/post-central"
              className="flex items-center p-2 text-blue-700 hover:bg-gray-100 rounded"
            >
              <BsPencilSquare className="w-5 h-5 mr-2 text-blue-400" />
              Bài đăng
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/notification"
              className="flex items-center p-2 text-blue-700 hover:bg-gray-100 rounded"
            >
              <FaBell className="w-5 h-5 mr-2 text-blue-400" />
              Thông báo
            </Link>
          </li>
        </ul>
        <div className="mt-6">
          <h2 className="text-blue-700 text-lg font-semibold mb-4">Cài đặt</h2>
          <ul>
            <li className="mb-2">
              <Link
                to="/dashboard/your-profile"
                className="flex items-center p-2 text-blue-700 hover:bg-gray-100 rounded"
              >
                <FaUserEdit className="w-5 h-5 mr-2 text-blue-400" />
                Trang cá nhân
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/dashboard/change-password"
                className="flex items-center p-2 text-blue-700 hover:bg-gray-100 rounded"
              >
                <FaLock className="w-5 h-5 mr-2 text-blue-400" />
                Đổi mật khẩu
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
