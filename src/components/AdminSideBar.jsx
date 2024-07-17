import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaPen, FaUserEdit, FaLock } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

const AdminSideBar = () => {
  return (
    <div className="w-48 h-screen bg-white border-r-2">
      <div className="p-4">
        <h2 className="text-blue-700 text-lg font-semibold mb-8">
          Bảng điều khiển
        </h2>
        <ul>
          <li className="mb-8">
            <Link
              to="/admin-dashboard/tag-central"
              className="flex items-center p-2 text-blue-700 hover:bg-gray-100 rounded"
            >
              <BsPencilSquare className="w-5 h-5 mr-2 text-blue-400" />
              Quản lý thẻ
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/admin-dashboard/statistic"
              className="flex items-center p-2 text-blue-700 hover:bg-gray-100 rounded"
            >
              <FaBell className="w-5 h-5 mr-2 text-blue-400" />
              Thống kê
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
