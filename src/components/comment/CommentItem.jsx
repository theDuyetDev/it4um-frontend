import React, { useState } from "react";
import TextEditor from "../TextEditor";
import { useSelector } from "react-redux";
import api from "../../config/axios";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";

const CommentItem = ({ comment, onReplyAdded, isReply = false }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const userAuth = useSelector((state) => state.user);

  const handleReply = async () => {
    if (userAuth.isAuthenticated) {
      try {
        const response = await api.post("/comment", {
          post_id: comment.post_id,
          commenter_id: userAuth.user._id,
          content: replyContent,
          reply_to: comment._id,
        });
        if (response.status === 201) {
          const newReply = response.data;
          onReplyAdded(newReply);
          setShowReplyForm(false);
          setReplyContent("");
          setShowReplies(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else
      toast.error(
        "Bạn phải đăng nhập tài khoản người dùng mới có thể bình luận"
      );
  };

  const handleReplyChange = (content) => {
    setReplyContent(content);
  };

  return (
    <div className={`py-4 my-4 bg-white ${isReply ? "" : "border-2"}`}>
      <div className="flex items-center mb-2 ">
        <img
          src={comment.commenter_id.profile_image || ""}
          alt={comment.commenter_id.fullname || ""}
          className="w-8 h-8 rounded-full mx-2"
        />
        <span className="font-semibold">{comment.commenter_id.fullname}</span>
        <span className="text-gray-500 text-sm ml-2">
          {new Date(comment.comment_at).toLocaleString("vi-VN")}
        </span>
      </div>
      <div className="ql-snow border-b-2">
        <div className="ql-editor">
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </div>
      </div>
      {!isReply && (
        <>
          <button
            className="text-blue-500 cursor-pointer mt-2"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Trả lời
          </button>
          {comment.replies && comment.replies.length > 0 && (
            <button
              className="text-blue-500 cursor-pointer mt-2 ml-4"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? "Ẩn phản hồi"
                : `Xem ${comment.replies.length} phản hồi`}
            </button>
          )}
        </>
      )}
      {showReplyForm && (
        <div className="mt-4 ml-4">
          <TextEditor onChange={handleReplyChange} value={replyContent} />
          <button className="button mt-2" onClick={handleReply}>
            Gửi phản hồi
          </button>
        </div>
      )}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              onReplyAdded={onReplyAdded}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
