import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../config/axios";
import { CiSearch } from "react-icons/ci";
import { FaEllipsisV } from "react-icons/fa";
import MultipleSelectChip from "../../components/post/MultiSelectChip";
import {
  Pagination,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import EditPostModal from "./EditPostModal";
import toast from "react-hot-toast";

const PostCentral = () => {
  const userAuth = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [tagFilterList, setTagFilterList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostIdToDelete, setSelectedPostIdToDelete] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await api.get(`post/user-post/${userAuth.user._id}`, {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchTerm") {
      setSearchTerm(value);
    } else if (name === "sortType") {
      setSortType(value);
    } else if (name === "tagFilterList") {
      setTagFilterList(value);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchPost();
  }, [searchTerm, sortType, tagFilterList, currentPage]);

  const handleMenuClick = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const handleEditPost = () => {
    const post = posts.find((p) => p._id === selectedPostId);
    setSelectedPost(post);
    setIsModalOpen(true);
    handleMenuClose();
  };

  const handleDeletePost = async () => {
    try {
      const response = await api.delete(`post/${selectedPostIdToDelete}`);
      if (response.status === 200) {
        toast.success("Xóa bài viết thành công");
        setPosts(posts.filter((post) => post._id !== selectedPostIdToDelete));
      }
      handleMenuClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa bài!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleOpenDeleteDialog = (postId) => {
    setSelectedPostIdToDelete(postId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedPostIdToDelete(null);
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  return (
    <div className="w-full h-full">
      <div className="flex mt-2 ml-12">
        <div className="relative mr-8 mb-4 mt-2" style={{ width: "300px" }}>
          <input
            type="text"
            name="searchTerm"
            placeholder="Tìm kiếm"
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-gray-100 focus:bg-gray-100"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <CiSearch className="w-6 h-6 text-gray-500" />
          </div>
        </div>
        <div className="mb-4 mt-2 mr-2" style={{ width: "200px" }}>
          <select
            name="sortType"
            className="w-full py-2 pl-3 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-gray-100 focus:bg-gray-100"
            value={sortType}
            onChange={handleChange}
          >
            <option value="latest">Mới nhất</option>
            <option value="views">Nhiều lượt xem nhất</option>
            <option value="likes">Nhiều lượt like nhất</option>
          </select>
        </div>
        <div className="ml-4">
          <MultipleSelectChip
            value={tagFilterList}
            onChange={setTagFilterList}
          />
        </div>
        <div className="absolute right-24 top-24">
          <button
            onClick={handleClearFilter}
            className="button bg-gray-300 hover:bg-gray-200 text-black ml-4"
          >
            Làm sạch bộ lọc
          </button>
          <button onClick={fetchPost} className="button ml-4">
            Lọc
          </button>
        </div>
      </div>
      <div>
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-blue-500">
                    {post.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {post.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        className="button"
                        onClick={() => handleTagClick(tag)}
                      />
                    ))}
                  </div>
                </div>
                <IconButton
                  onClick={(event) => handleMenuClick(event, post._id)}
                >
                  <FaEllipsisV />
                </IconButton>
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedPostId === post._id}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEditPost}>Sửa</MenuItem>
                <MenuItem onClick={() => handleOpenDeleteDialog(post._id)}>
                  Xóa
                </MenuItem>
                <Dialog
                  open={deleteDialogOpen}
                  onClose={handleCloseDeleteDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Xác nhận xóa bài viết?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Bạn có chắc chắn muốn xóa bài viết này không?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                      Hủy
                    </Button>
                    <Button
                      onClick={handleDeletePost}
                      color="primary"
                      autoFocus
                    >
                      Xóa
                    </Button>
                  </DialogActions>
                </Dialog>
              </Menu>
            </div>
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
      <EditPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </div>
  );
};

export default PostCentral;
