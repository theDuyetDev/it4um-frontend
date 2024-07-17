import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import TextEditor from "../../components/TextEditor";
import MultipleSelectChip from "../../components/post/MultiSelectChip";
import { motion as m } from "framer-motion";
import PreviewPost from "../../components/post/PreviewPost";
import api from "../../config/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditPostModal = ({ isOpen, onClose, post }) => {
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("write");
  const [tags, setTags] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (post) {
      setEditorContent(post.content);
      setTitle(post.title);
      setTags(post.tags);
      setId(post._id);
    }
  }, [post]);

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  const handleSaveChanges = async () => {
    if (editorContent.length === 0) {
      toast.error("Không được để trống nội dung!");
    } else {
      if (tags.length === 0) {
        toast.error("Bài viết cần được gắn thẻ!");
      } else {
        if (title.length === 0) {
          toast.error("Không được để trống tiêu đề!");
        } else {
          try {
            const response = await api.put(`/post/${id}`, {
              content: editorContent,
              title,
              tags,
            });
            if (response.status === 200) {
              toast.success("Bạn đã cập nhật post thành công!");
            }
          } catch (error) {
            toast.error("Có lỗi xảy ra");
          }
          onClose();
          navigate(`/post/${id}`);
        }
      }
    }
  };

  const handleTagsChange = (selectedTags) => {
    setTags(selectedTags);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflow: "scroll",
        }}
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-12"
        >
          <div className="flex justify-center mb-6">
            <button
              className={`w-1/2 py-2 text-center ${
                selectedOption === "write"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-200 text-black"
              } rounded-l-lg transition-all duration-300 ease-in-out`}
              onClick={() => setSelectedOption("write")}
            >
              Viết
            </button>
            <button
              className={`w-1/2 py-2 text-center ${
                selectedOption === "preview"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-200 text-black"
              } rounded-r-lg transition-all duration-300 ease-in-out`}
              onClick={() => setSelectedOption("preview")}
            >
              Xem trước
            </button>
          </div>
          {selectedOption === "write" ? (
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-2">
                Tiêu đề
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-blue-500"
                placeholder="Nhập tiêu đề bài viết"
              />
              <label className="block text-xl font-medium text-gray-700 mb-2 mt-2">
                Thẻ
              </label>
              <MultipleSelectChip value={tags} onChange={handleTagsChange} />

              <label className="block text-xl font-medium text-gray-700 mb-2 mt-2">
                Nội dung
              </label>
              <TextEditor
                initialValue={editorContent}
                onChange={handleEditorChange}
              />
              <div className="flex justify-center">
                <button onClick={handleSaveChanges} className="button">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          ) : (
            <PreviewPost title={title} content={editorContent} />
          )}
        </m.div>
      </Box>
    </Modal>
  );
};

export default EditPostModal;
