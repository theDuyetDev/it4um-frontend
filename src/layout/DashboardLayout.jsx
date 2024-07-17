import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const userAuth = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuth.isAuthenticated) navigate("/");
  }, []);
  return (
    <div className="flex">
      <SideBar />
      <div className="mx-8 my-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
