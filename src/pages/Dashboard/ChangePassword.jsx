import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import InputBox from "../../components/InputBox";
import api from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [otp, setOtp] = useState("");
  const userAuth = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRequestVerification = async () => {
    if (userAuth.user.email !== email) {
      toast.error("Email bạn nhập không phải là email tài khoản của bạn!");
    } else {
      const response = await api.post("auth/send-otp", {
        email,
      });
      if (response.status === 200) {
        setIsVerificationRequested(true);
        setShowPasswordInput(true);
        setCountdown(60);
        toast.success("Hãy kiểm tra hòm thư của bạn");
      } else {
        toast.error("Có lỗi khi gửi mã OTP");
      }
    }
  };

  useEffect(() => {
    let timer = null;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsVerificationRequested(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu nhắc lại không trùng với mật khẩu mới!");
      return;
    }

    try {
      const res = await api.post("auth/validate-otp", {
        email: email,
        otp: otp,
      });

      if (res.status === 200) {
        const response = await api.put(
          `/user/change-password/${userAuth.user._id}`,
          {
            password: confirmPassword,
          }
        );

        if (response.status === 200) {
          toast.success("Mật khẩu đã được thay đổi thành công!");
          dispatch(userLogout());
          navigate("/login");
        } else {
          toast.error("Có lỗi khi cập nhật mật khẩu. Vui lòng thử lại sau!");
        }
      } else {
        toast.error("Có lỗi khi xác thực OTP. Vui lòng thử lại sau!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error.message);
    }
  };

  return (
    <div className="flex p-6 bg-white rounded-md place-items-center">
      <div className="shadow-lg border px-16 py-16 mt-16 ml-72">
        <h2 className="text-2xl mb-4 font-bold text-blue-600">Đổi mật khẩu</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4 min-w-[400px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Nhập địa chỉ email"
              disabled={isVerificationRequested}
              required
              style={{ textOverflow: "clip" }}
            />
            <button
              type="button"
              onClick={handleRequestVerification}
              className={`absolute inset-y-0 right-0 px-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                isVerificationRequested ? "hidden" : ""
              }`}
              disabled={isVerificationRequested}
            >
              Lấy mã xác nhận
            </button>
            {isVerificationRequested && (
              <span className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-200 text-gray-600 rounded-md">
                {countdown > 0 ? `Lấy lại sau ${countdown}s` : "Lấy lại mã"}
              </span>
            )}
          </div>
          {showPasswordInput && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mã xác nhận:
                  <InputBox
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Mã xác nhận"
                    disabled={false}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mật khẩu mới:
                  <InputBox
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mật khẩu mới"
                    disabled={false}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nhắc lại mật khẩu:
                  <InputBox
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhắc lại mật khẩu"
                    disabled={false}
                  />
                </label>
              </div>
            </>
          )}
          <div className="mb-4">
            {showPasswordInput && (
              <button type="submit" className="button">
                Đổi mật khẩu
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
