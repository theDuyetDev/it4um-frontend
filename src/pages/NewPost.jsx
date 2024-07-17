import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import TextEditor from "../components/TextEditor";
import PreviewPost from "../components/post/PreviewPost";
import MultipleSelectChip from "../components/post/MultiSelectChip";
import api from "../config/axios";
import { IoIosArrowUp } from "react-icons/io";

const NewPost = () => {
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("write");
  const [tags, setTags] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    if (!userAuth.isAuthenticated) {
      navigate("/login");
      toast("Bạn cần đăng nhập để có thể viết bài!", {
        icon: "⚠️",
        duration: 2000,
      });
    }
  }, [navigate, userAuth.isAuthenticated]);

  const handleTagsChange = (selectedTags) => {
    setTags(selectedTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length === 0) {
      toast.error("Không được để trống nội dung!");
    } else {
      if (tags.length === 0) {
        toast.error("Bài viết cần được gắn thẻ!");
      } else {
        if (title.length === 0) {
          toast.error("Không được để trống tiêu đề");
        } else {
          const author = userAuth.user._id;
          const newPost = { title, content, tags, author };
          try {
            const response = await api.post("/post", newPost);
            if (response.status === 201) toast.success("Đăng bài thành công!");
            setTimeout(() => navigate(`/post/${response.data._id}`), 2000);
          } catch (error) {
            toast.error("Lỗi khi đăng bài!");
          }
        }
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowScrollToTop(false);
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Viết bài mới</h1>
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
            {/* Component MultipleSelectChip để chọn tag */}
            <MultipleSelectChip value={tags} onChange={handleTagsChange} />
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-700 mb-2">
              Nội dung
            </label>
            {/* Component TextEditor để nhập nội dung */}
            <TextEditor initialValue={content} onChange={setContent} />
          </div>
          <button type="submit" className="button">
            Đăng bài
          </button>
        </form>
      ) : (
        <PreviewPost title={title} content={content} />
      )}

      {/* Nút scroll to top */}
      <m.AnimatePresence>
        {showScrollToTop && (
          <m.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -500 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 right-10 text-black p-4 rounded-full shadow-lg"
            style={{ backgroundColor: "#F3F4F6" }}
            onClick={handleScrollToTop}
          >
            <IoIosArrowUp className="text-3xl" />
          </m.button>
        )}
      </m.AnimatePresence>
    </m.div>
  );
};

export default NewPost;
