import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { Checkbox, FormControlLabel, Pagination } from "@mui/material";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/post/PostItem";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [tagFilterList, setTagFilterList] = useState([]);
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleTagClick = (tag) => {
    if (tagFilterList.includes(tag)) {
      setTagFilterList(tagFilterList.filter((t) => t !== tag));
    } else {
      setTagFilterList([...tagFilterList, tag]);
    }
  };

  const handleFilter = () => {
    fetchFilteredPosts();
  };

  const fetchTags = async () => {
    try {
      const response = await api.get("/tag");
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchFilteredPosts = async () => {
    try {
      const response = await api.get("post", {
        params: {
          sort: sortType,
          tag: tagFilterList.join(","),
          search: searchTerm,
          page: currentPage,
        },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error filtering posts:", error);
    }
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setSortType("latest");
    setTagFilterList([]);
    setCurrentPage(1);
    fetchFilteredPosts();
  };

  useEffect(() => {
    fetchTags();
  });

  useEffect(() => {
    fetchFilteredPosts();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="flex flex-col md:flex-row m-auto"
    >
      {/* Left section */}
      <div className="w-full md:w-3/5 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
        {posts.length === 0 && <h1>Không có bài viết phù hợp</h1>}
        {posts.length !== 0 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ marginTop: 4 }}
          />
        )}
      </div>

      {/* Right section */}
      <div
        className="w-full md:w-2/5 p-4 mt-12"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 32px)",
          position: "sticky",
          top: "60px",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="relative mb-4" style={{ width: "80%" }}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-gray-100 focus:bg-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <CiSearch className="w-6 h-6 text-gray-500" />
            </div>
          </div>

          <div className="mb-4" style={{ width: "80%" }}>
            <select
              className="w-full py-2 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-gray-100 focus:bg-gray-100"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="latest">Mới nhất</option>
              <option value="views">Nhiều lượt xem nhất</option>
              <option value="likes">Nhiều lượt like nhất</option>
            </select>
          </div>

          <div
            className="mb-4"
            style={{
              width: "80%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {tags.map((tag) => (
              <div key={tag._id} className="flex items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tagFilterList.includes(tag.tag_name)}
                      onChange={() => handleTagClick(tag.tag_name)}
                    />
                  }
                  label={tag.tag_name}
                  style={{ whiteSpace: "nowrap", color: "#4B5563" }}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClearFilter}
              className="button bg-gray-300 hover:bg-gray-200 text-black"
            >
              Làm sạch bộ lọc
            </button>
            <button onClick={handleFilter} className="button ">
              Lọc
            </button>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default Home;
