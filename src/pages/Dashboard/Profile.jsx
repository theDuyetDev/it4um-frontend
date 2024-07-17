import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/axios";
import InputBox from "../../components/InputBox";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../config/firebase";
import toast from "react-hot-toast";
import { updateUserInfo } from "../../redux/actions/authActions";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    expertise: "",
    profile_image: "",
    violation_score: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.user);

  const getRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/user/${userAuth.user._id}`);
      if (response.status === 200) {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const randomString = getRandomString(8);
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "");
    const fileName = `${randomString}_${cleanFileName}`;
    const storageRef = ref(storage, `/profile_image/${fileName}`);

    try {
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      setProfileData((prevData) => ({
        ...prevData,
        profile_image: imageUrl,
      }));
      toast.success("Đã upload ảnh!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const errors = {};

    if (!phoneNumber) {
      return errors;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phone_number = "Số điện thoại phải chứa 10 ký tự";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const phoneNumber = profileData.phone_number;
    const errors = validatePhoneNumber(phoneNumber);

    if (Object.keys(errors).length > 0) {
      toast.error(errors.phone_number);
      return;
    }

    try {
      const response = await api.put(`/user/${userAuth.user._id}`, profileData);
      if (response.status === 200) {
        dispatch(updateUserInfo(profileData));
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-bold text-3xl mb-6 flex justify-center ml-96 text-blue-600">
        Thông tin cá nhân
      </h1>
      <div className="flex items-center">
        {/* Image upload section (30% width) */}
        <div className="w-1/3 pr-8">
          <div className="mb-6">
            <label
              htmlFor="uploadImg"
              id="profileImgLabel"
              className="relative block w-48 h-48 bg-gray-100 rounded-full overflow-hidden ml-12"
            >
              <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                Tải ảnh lên
              </div>
              <img
                src={profileData.profile_image}
                alt="Profile"
                className="object-cover w-full h-full rounded-full border-black border"
              />
            </label>
            <input
              type="file"
              id="uploadImg"
              accept=".jpg, .png, .jpeg"
              hidden
              onChange={handleUploadImage}
            />
          </div>
        </div>
        {/* Profile input section (70% width) */}
        <div className="w-2/3 pl-8">
          <div className="flex">
            {/* First column */}
            <div className="w-1/2 pr-4 min-w-[400px]">
              <div className="mb-6">
                <label className="block font-semibold mb-2" htmlFor="fullname">
                  Họ và tên
                </label>
                <InputBox
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={profileData.fullname}
                  placeholder="Họ và tên"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <InputBox
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                  disabled
                  className="w-full"
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2" htmlFor="address">
                  Địa chỉ
                </label>
                <InputBox
                  id="address"
                  name="address"
                  type="text"
                  value={profileData.address}
                  placeholder="Không"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            </div>
            {/* Second column */}
            <div className="w-1/2 pl-4 min-w-[400px]">
              <div className="mb-6">
                <label
                  className="block font-semibold mb-2"
                  htmlFor="phone_number"
                >
                  Điện thoại
                </label>
                <InputBox
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  value={profileData.phone_number}
                  placeholder="Không"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2" htmlFor="expertise">
                  Chuyên môn
                </label>
                <InputBox
                  id="expertise"
                  name="expertise"
                  type="text"
                  value={profileData.expertise}
                  placeholder="Không"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block font-semibold mb-2"
                  htmlFor="violation_score"
                >
                  Mức độ vi phạm
                </label>
                <InputBox
                  id="violation_score"
                  name="violation_score"
                  type="text"
                  value={profileData.violation_score}
                  placeholder=""
                  disabled
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 ml-96">
        <button className="button" onClick={handleSubmit}>
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default Profile;
