import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axios";
import { motion as m, AnimatePresence } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import "react-quill/dist/quill.snow.css";
import { BsPencilSquare } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";
import { FaRegComments } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CommentPool from "../components/comment/CommentPool";

const PostDetail = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const userAuth = useSelector((state) => state.user);
  const [showComments, setShowComments] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/post/${id}`);
      if (response.status === 200) {
        setPostData(response.data);
        setTotalLikes(response.data.total_likes);
        setIsLiked(response.data.like_by.includes(userAuth.user._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      if (userAuth.isAuthenticated) {
        const response = await api.post(`/post/like`, {
          userId: userAuth.user._id,
          postId: postData._id,
        });
        if (response.status === 200) {
          setIsLiked(true);
          setTotalLikes(totalLikes + 1);
        }
      } else {
        toast("Bạn cần đăng nhập để thích bài viết", {
          icon: "⚠️",
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      if (userAuth.isAuthenticated) {
        const response = await api.post(`/post/unlike`, {
          userId: userAuth.user._id,
          postId: postData._id,
        });
        if (response.status === 200) {
          setIsLiked(false);
          setTotalLikes(totalLikes - 1);
        }
      } else {
        toast("Bạn cần đăng nhập để bỏ thích bài viết", {
          icon: "⚠️",
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowScrollToTop(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="flex items-center justify-center"
    >
      <AnimatePresence>
        {showComments && (
          <m.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{
              opacity: showComments ? 1 : 0,
              x: showComments ? 0 : "100%",
            }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5 }}
            className="fixed border-2 top-20 right-0 h-full w-[40%] bg-white z-40 overflow-scroll"
          >
            <CommentPool postId={postData._id} onClose={handleCloseComments} />
          </m.div>
        )}
      </AnimatePresence>
      <div className="w-[60%] p-4 mt-2" style={{ backgroundColor: "#F3F4F6" }}>
        {postData.author && (
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <img
                src={postData.author.profile_image}
                alt={postData.author.fullname}
                className="w-10 h-10 rounded-full mt-4"
              />
              <div className="flex flex-col mt-2" title="Số bài viết">
                <h1 className="mt-1 font-bold">{postData.author.fullname}</h1>
                <div className="flex items-center gap-1">
                  <BsPencilSquare />
                  <p>{postData.author.total_post}</p>
                </div>
              </div>
            </div>
            <div className="text-base">
              <p className="text-gray-500 mt-4   mr-3">
                Đã đăng vào{" "}
                {new Date(postData.post_date).toLocaleString("vi-VN")}
              </p>
              {postData.post_date !== postData.modify_date ? (
                <p className="text-gray-500 mt-1 mr-3">
                  Chỉnh sửa gần nhất vào{" "}
                  {new Date(postData.modify_date).toLocaleString("vi-VN")}
                </p>
              ) : null}
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <IoMdEye className="mr-1 text-xl" title="Số lượt xem" />{" "}
                {postData.total_views}
                <FaRegComments
                  className="ml-4 mr-1 text-xl cursor-pointer"
                  title="Số lượt bình luận"
                  onClick={handleToggleComments}
                />{" "}
                {postData.total_comments}
                {isLiked ? (
                  <AiFillLike
                    color="blue"
                    className="ml-4 mr-1 text-xl cursor-pointer"
                    onClick={handleUnlike}
                    title="Bỏ thích"
                  />
                ) : (
                  <AiOutlineLike
                    className="ml-4 mr-1 text-xl cursor-pointer"
                    onClick={handleLike}
                    title="Thích"
                  />
                )}
                {totalLikes}
              </div>
            </div>
          </div>
        )}
        <h1 className="font-bold text-2xl mt-8">{postData.title}</h1>
        <div className="ql-snow w-full">
          <div className="ql-editor">
            <div dangerouslySetInnerHTML={{ __html: postData.content }} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showScrollToTop && (
          <m.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -500 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 right-10  text-black p-4 rounded-full shadow-lg"
            style={{ backgroundColor: "#F3F4F6" }}
            onClick={handleScrollToTop}
          >
            <IoIosArrowUp className="text-3xl" />
          </m.button>
        )}
      </AnimatePresence>
    </m.div>
  );
};

export default PostDetail;
