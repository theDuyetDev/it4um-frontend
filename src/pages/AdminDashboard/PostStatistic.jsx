import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import {
  Pagination,
  Stack,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem as SelectMenuItem,
} from "@mui/material";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PostStatistic = () => {
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedViolationLevel, setSelectedViolationLevel] = useState(1);
  const navigate = useNavigate();

  const handleMenuClick = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.get(
      `post/statistic/${selectedDate}/${currentPage}`
    );
    if (response.status === 200) {
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    handleSubmit(event);
  };

  const handleOpenDeleteDialog = () => {
    setAnchorEl(null);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeletePost = async () => {
    const response = await api.post("/admin/delete-post", {
      postId: selectedPostId,
      violation_score: selectedViolationLevel,
    });
    if (response.status === 200) {
      toast.success("Đã xóa bài đăng!");
      setPosts(posts.filter((post) => post._id !== selectedPostId));
      setDeleteDialogOpen(false);
    }
  };

  const handleViolationLevelChange = (event) => {
    setSelectedViolationLevel(event.target.value);
  };

  const handleConfirmDelete = () => {
    setDeleteDialogOpen(false);

    handleDeletePost();
  };
  useEffect(() => {
    handleSubmit();
  }, [currentPage, posts]);

  return (
    <div className="flex justify-center">
      <div
        className="bg-white p-6 rounded-lg shadow-md ml-60"
        style={{ width: "800px" }}
      >
        <Typography
          variant="h5"
          gutterBottom
          className="text-2xl font-bold text-blue-500"
        >
          Thống kê bài đăng
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="selectedDate"
              className="block text-sm font-medium text-gray-700"
            >
              Chọn ngày:
            </label>
            <input
              id="selectedDate"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Thống kê
          </button>
        </form>

        <div className="mt-4">
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
                  <MenuItem
                    onClick={() => {
                      navigate(`/post/${selectedPostId}`);
                    }}
                  >
                    Xem chi tiết
                  </MenuItem>
                  <MenuItem onClick={handleOpenDeleteDialog}>Xóa</MenuItem>
                </Menu>
              </div>
            ))}
        </div>

        {posts.length !== 0 ? (
          <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        ) : (
          <h1>Không có bài đăng nào!</h1>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">
            Xác nhận xóa bài đăng
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Bạn có chắc chắn muốn xóa bài đăng này?
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel id="violation-level-label">
                Chọn mức vi phạm
              </InputLabel>
              <Select
                labelId="violation-level-label"
                id="violation-level"
                value={selectedViolationLevel}
                onChange={handleViolationLevelChange}
                label="Chọn mức vi phạm"
              >
                <SelectMenuItem value={1}>1</SelectMenuItem>
                <SelectMenuItem value={2}>2</SelectMenuItem>
                <SelectMenuItem value={4}>4</SelectMenuItem>
                <SelectMenuItem value={20}>20</SelectMenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Hủy
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default PostStatistic;
