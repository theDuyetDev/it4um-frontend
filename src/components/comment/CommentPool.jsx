import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import TextEditor from "../TextEditor";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";

const CommentPool = ({ postId, onClose }) => {
  const [editorContent, setEditorContent] = useState("");
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const userAuth = useSelector((state) => state.user);

  const fetchComments = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get(`/comment?postId=${postId}&page=${page}`);
      if (response.status === 200) {
        setComments((prevComments) => [
          ...prevComments,
          ...response.data.comments,
        ]);
        setHasMore(response.data.totalComments > comments.length + 5);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleComment = async () => {
    if (userAuth.isAuthenticated) {
      try {
        const response = await api.post("/comment", {
          post_id: postId,
          commenter_id: userAuth.user._id,
          content: editorContent,
        });
        if (response.status === 201) {
          const newComment = response.data;
          setComments((prevComments) => [newComment, ...prevComments]);
          setEditorContent("");
        }
      } catch (error) {
        console.log(error);
      }
    } else
      toast.error(
        "Bạn phải đăng nhập tài khoản người dùng mới có thể bình luận!"
      );
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const loadMoreComments = () => {
    fetchComments();
  };

  const handleReplyAdded = (reply) => {
    setComments((prevComments) => {
      const addReplyToComments = (comments) => {
        return comments.map((comment) => {
          if (comment._id === reply.reply_to) {
            return { ...comment, replies: [reply, ...(comment.replies || [])] };
          }
          if (comment.replies) {
            return { ...comment, replies: addReplyToComments(comment.replies) };
          }
          return comment;
        });
      };
      return addReplyToComments(prevComments);
    });
  };

  return (
    <div
      className="bg-white p-4 overflow-auto h-full"
      style={{ backgroundColor: "#F3F4F6" }}
    >
      <div className="flex justify-end ">
        <AiOutlineClose className="cursor-pointer" onClick={onClose} />
      </div>
      <div className="mt-4 bg-white">
        <TextEditor onChange={handleEditorChange} value={editorContent} />
        <div style={{ backgroundColor: "#F3F4F6" }}>
          <button className="button" onClick={handleComment}>
            Bình luận
          </button>
        </div>
      </div>
      <div>
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onReplyAdded={handleReplyAdded}
          />
        ))}
      </div>
      {hasMore && (
        <div
          className="mt-4 mb-4 text-right text-blue-500 cursor-pointer"
          onClick={loadMoreComments}
        >
          Xem thêm
        </div>
      )}
      <div className="mb-20"></div>
    </div>
  );
};

export default CommentPool;
