import React, { useState } from "react";
import MultipleSelectChip from "../../components/post/MultiSelectChip";
import InputBox from "../../components/InputBox";
import api from "../../config/axios";
import toast from "react-hot-toast";

const TagCentral = () => {
  const [tagFilterList, setTagFilterList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [tagName, setTagName] = useState("");

  const handleAddTag = () => {
    setShowForm(true);
  };

  const handleChange = (event) => {
    setTagName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post("/tag", {
      tag_name: tagName,
    });
    if (response.status === 201) {
      toast.success("Đã thêm thẻ mới!");
      setTagName("");
      setShowForm(false);
    } else toast.error("Lỗi khi thêm thẻ");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-full max-w-xs"
        style={{ marginLeft: "400px", marginBottom: "200px" }}
      >
        <label className="text-2xl font-bold mb-4">Danh sách thẻ hiện có</label>
        <MultipleSelectChip value={tagFilterList} onChange={setTagFilterList} />
        <button className="button" onClick={handleAddTag}>
          Thêm thẻ
        </button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <InputBox
              type="text"
              placeholder="Nhập tên thẻ"
              className="input"
              value={tagName}
              onChange={handleChange}
            />
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TagCentral;
