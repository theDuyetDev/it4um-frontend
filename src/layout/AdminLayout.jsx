import React, { useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const adminAuth = useSelector((state) => state.admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminAuth.isAuthenticated) navigate("/");
  }, []);
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="mx-8 my-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
