import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoBell } from "react-icons/go";
import { BsPencilSquare } from "react-icons/bs";
import UserNav from "./UserNav";
import { motion as m } from "framer-motion";
import api from "../config/axios";
import AdminNav from "./AdminNav";

const Navbar = () => {
  const userAuth = useSelector((state) => state.user);
  const adminAuth = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await api.get(
          `/notification/un-read/${userAuth.user._id}`
        );
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching unread notifications:", error);
      }
    };

    if (userAuth.isAuthenticated) {
      fetchUnreadCount();
    }
  }, [userAuth.isAuthenticated]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuOpenChange = (isOpen) => {
    setMenuOpen(isOpen);
  };

  const handleNewPostClick = () => {
    navigate("/new-post");
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="z-10"
    >
      <nav className="flex justify-between items-center bg-white border-b-2 shadow-md">
        {/* Logo */}
        <Link to={"/"} className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 w-20 ml-8" />
        </Link>

        {/* Actions */}
        <div className="flex items-center justify-center space-x-4 mr-8">
          {!adminAuth.isAuthenticated && (
            <>
              <button
                onClick={() => navigate("/guide")}
                className="gap-1 flex items-center px-4 py-2 border rounded-full button"
              >
                Hướng dẫn và Quy tắc
              </button>
              <button
                onClick={handleNewPostClick}
                className="gap-1 flex items-center px-4 py-2 border rounded-full button"
              >
                <BsPencilSquare />
                Viết bài
              </button>
            </>
          )}

          {userAuth.isAuthenticated || adminAuth.isAuthenticated ? (
            userAuth.isAuthenticated ? (
              <div className="gap-2 flex" ref={menuRef}>
                <Link to={"/dashboard/notification"}>
                  <button className="w-10 h-10 rounded-full border flex justify-center items-center bg-blue-600">
                    {unreadCount !== 0 && (
                      <span className="text-white w-5 h-5 rounded-full bg-red-600 absolute top-4 right-[75px] flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                    <GoBell className="w-6 h-6 text-white" />
                  </button>
                </Link>

                <div>
                  <button
                    className="flex items-center space-x-4 rounded-full border-2 h-10 w-10 justify-center hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    <img
                      src={userAuth.user.profile_image}
                      className="h-10 w-10 rounded-full cursor-pointer border border-blue-600"
                      alt="User Profile"
                    />
                  </button>
                  {menuOpen && (
                    <UserNav onMenuOpenChange={handleMenuOpenChange} />
                  )}
                </div>
              </div>
            ) : (
              <div className="gap-2 flex" ref={menuRef}>
                <button
                  className="flex items-center space-x-4 rounded-full border-2 h-10 w-10 justify-center hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  <img
                    src={adminAuth.admin.admin.profile_image}
                    className="h-10 w-10 rounded-full cursor-pointer border border-blue-600"
                    alt="Admin Profile"
                  />
                </button>
                {menuOpen && (
                  <AdminNav onMenuOpenChange={handleMenuOpenChange} />
                )}
              </div>
            )
          ) : (
            <>
              <Link to="/login">
                <button className="button">Đăng nhập</button>
              </Link>
              <Link to="/signup">
                <button className="button">Đăng ký</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </m.div>
  );
};

export default Navbar;
