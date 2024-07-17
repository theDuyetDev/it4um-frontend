import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/axios";
import { Chip, Pagination } from "@mui/material";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    expertise: "",
    profile_image: "",
    violation_score: "",
    total_post: "",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const res = await api.get(`/user/${id}`);
    if (res.status === 200) setUserData(res.data);
    console.log(res.data);
  };

  const fetchUserPost = async () => {
    try {
      const response = await api.get(`post/user-post/${id}`, {
        params: {
          page: currentPage,
        },
      });
      console.log(response.data);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error filtering posts:", error);
    }
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchUserData();
    fetchUserPost();
  }, [currentPage]);

  return (
    <div className="container m-8 p-4">
      <div className="flex items-center gap-4">
        <div className="w-32 h-32 rounded-full border overflow-hidden">
          <img
            src={userData.profile_image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mt-4">{userData.fullname}</h1>
          <h2>@{userData.email}</h2>
        </div>
      </div>
      <div className="w-full border-b border-gray mb-4 mt-2"></div>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3">
          {posts &&
            posts.map((post) => (
              <div key={post._id} className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2
                      className="text-xl font-bold text-blue-500 cursor-pointer hover:scale-110"
                      onClick={() => {
                        navigate(`/post/${post._id}`);
                      }}
                    >
                      {post.title}
                    </h2>
                    <div className="flex items-center space-x-2">
                      {post.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          className="px-4 py-2  text-white font-bold rounded-full shadow-lg mt-4 mb-4 transition ease-in-out transform "
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ marginTop: 4 }}
          />
        </div>
        <div className=" col-span-2 border w-80 h-48 p-2 mt-12 ml-24">
          <div className="flex justify-between mb-2">
            <h1 className="font-bold"> Tổng số bài viết</h1>
            <h1>{userData.total_post}</h1>
          </div>
          <div className="flex justify-between mb-2">
            <h1 className="font-bold"> Địa chỉ </h1>
            <h1>{userData.address || "Không"}</h1>
          </div>

          <div className="flex justify-between mb-2">
            <h1 className="font-bold"> Điện thoại </h1>
            <h1>{userData.phone_number || "Không"}</h1>
          </div>

          <div className="flex justify-between mb-2">
            <h1 className="font-bold"> Chuyên môn </h1>
            <h1>{userData.expertise || "Không"}</h1>
          </div>
          <div className="flex justify-between mb-2">
            <h1 className="font-bold"> Mức độ vi phạm </h1>
            <h1>{userData.violation_score}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
