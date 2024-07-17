import React from "react";
import { Chip } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostItem = ({ post, handleTagClick }) => {
  const navigate = useNavigate();

  return (
    <div
      className="mb-4 p-4 border rounded  w-full shadow-lg"
      style={{ backgroundColor: "#F3F4F6" }}
    >
      <div
        className="flex justify-between items-center mb-2"
        onClick={() => {
          navigate(`/user-profile/${post.author._id}`);
        }}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={post.author.profile_image}
            alt={post.author.fullname}
            className="w-10 h-10 rounded-full border border-blue-500"
          />
          <div>
            <p className="font-semibold text-blue-600 hover:scale-110">
              {post.author.fullname}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post.modify_date).toLocaleString("vi-VN")}
            </p>
          </div>
        </div>
      </div>
      <h3
        className="text-lg font-bold mb-2 text-gray-800 cursor-pointer hover:text-blue-600 hover:scale-105"
        onClick={() => {
          navigate(`/post/${post._id}`);
        }}
      >
        {post.title}
      </h3>
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <IoMdEye className="mr-1 text-gray-500" />{" "}
        <span className="text-gray-800">{post.total_views}</span>
        <FaRegComments className="ml-4 mr-1 text-gray-500" />
        <span className="text-gray-800">{post.total_comments}</span>
        <AiOutlineLike className="ml-4 mr-1 text-gray-500" />
        <span className="text-gray-800">{post.total_likes}</span>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {post.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            className="button"
            onClick={() => {
              handleTagClick(tag);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PostItem;
