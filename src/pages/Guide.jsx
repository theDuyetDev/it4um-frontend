import React, { useState } from "react";
import { motion as m } from "framer-motion";
import write_post_guide from "../assets/write_post_guide.png";

const Guide = () => {
  const [selectedOption, setSelectedOption] = useState("guide");
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
            selectedOption === "guide"
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-200 text-black"
          } rounded-l-lg transition-all duration-300 ease-in-out`}
          onClick={() => setSelectedOption("guide")}
        >
          Hướng dẫn
        </button>
        <button
          className={`w-1/2 py-2 text-center ${
            selectedOption === "rule"
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-200 text-black"
          } rounded-r-lg transition-all duration-300 ease-in-out`}
          onClick={() => setSelectedOption("rule")}
        >
          Quy tắc
        </button>
      </div>
      {selectedOption === "guide" ? (
        <div>
          <h1 className="text-2xl font-bold">Hướng dẫn</h1>
          <p className="mt-2">
            Dưới đây là hướng dẫn viết bài đăng trên diễn đàn
          </p>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/it4um-e8e1d.appspot.com/o/write_post_guide.png?alt=media&token=585a92a8-7401-437a-8b9b-940908599d39"
            }
            alt={"Hướng dẫn"}
            className="border"
          ></img>
          <p className="text-left text-lg mt-2">
            <span className="font-bold">Chọn gắn thẻ: </span> Bạn có thể gắn
            nhiều thẻ, nhưng cần chú ý tránh gắn sai thẻ để không bị xử lí vi
            phạm. Chi tiết xem ở phần "Quy tắc"
          </p>
          <p className="text-left text-lg mt-2">
            <span className="font-bold">Cỡ chữ: </span> Các cỡ chữ có thể chọn
            bao gồm: Small - Nhỏ, Medium - Trung binh, Large - Lớn và Huge - Rất
            lớn
          </p>
          <p className="text-left text-lg mt-2">
            <span className="font-bold">Kí hiệu code: </span> Để đánh dấu đoạn
            code ở bài viết của bạn. Lưu ý: Trình soạn thảo có thể xảy ra xung
            đột với các phần mềm soạn thảo tiếng việt, nên bạn hãy bôi đen đoạn
            văn bản rồi nhấn kí hiệu code thay vì nhấn kí hiệu code và viết
          </p>
          <p className="text-left text-lg mt-2">
            <span className="font-bold">Gắn link: </span> Để đánh dấu các đường
            link mà bạn muốn dẫn đến trong bài viết, hãy bôi đen đoạn văn bản
            biểu thị cho đường link và nhấn biểu tượng và điền đường link bạn
            muốn dẫn đến
          </p>
          <p className="text-left text-lg mt-2">
            <span className="font-bold">Tải ảnh: </span> Để tránh tốn chi phí
            lưu trữ dữ liệu cũng như đẩy nhanh quá trình truy xuất dữ liệu, bạn
            nên xử dụng tính năng này với các ảnh mà bạn muốn tải lên(đặc biệt
            là ảnh chụp màn hình)
          </p>
          <p className="text-left text-lg mt-2">
            <span className="font-bold">Xóa css chữ:</span> Đưa chữ về dạng mặc
            định nếu bạn đã áp dụng nhiều kiểu cho chữ mà không muốn xóa từng
            cái một. Ví dụ bạn cho cỡ chữ là Large - Lớn, lùi đầu dòng và cho
            chữ đậm và không muốn nữa, thì bạn có thể dùng biêu tượng này để
            ngay lập tức đưa các chữ về trạng thái ban đầu
          </p>
          <p className="text-left text-lg mt-2">
            <span className="font-bold">Mở chế độ xem trước: </span> Bạn có thể
            nhấn vào đây để chuyển qua tab xem trước, xem bài viết của bạn sẽ
            được hiển thị như thế nào
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Quy tắc</h1>
          <div>
            <h1 className="text-xl text-left mt-2">
              1. Tôn trọng và lịch sử với mọi người trên cộng đồng, không bình
              luận,, trao đổi về các nội dung khiếm nhã
            </h1>
            <h1 className="text-xl text-left mt-2">
              2. Tránh đăng những bài có nội dung trùng lặp, đăng nhiều lần về
              một bài viết tương tự. Vi phạm sẽ có thể bị xử phạt
            </h1>
            <h1 className="text-xl text-left mt-2">
              3. Bài viết nếu có nội dung tham khảo từ các trang web, diễn đàn
              khác, cần phải ghi rõ nơi (đường link) tham khảo ở bài viết
            </h1>
            <h1 className="text-xl text-left mt-2">
              4. Bài viết có nội dung thiên về hỏi đáp cần được gắn thẻ hỏi đáp,
              bài viết cần được gắn thẻ phù hợp với nội dung. Để đảm bảo tính
              chính xác về nội dung trên diễn đàn. Ban quản trị sẽ tiến hành xóa
              bài cũng như tăng mức xử phạt vi phạm với nhưng bài viết bị gắn
              sai thẻ, tùy vào mức độ vi phạm.
            </h1>
            <p className="text-xl text-left font-bold mt-2">
              Lưu ý:
              <span className="font-thin text-lg">
                {" "}
                Mỗi tài khoản người dùng khi đạt đến mức vi phạm{" "}
                <span className="font-bold">20</span> sẽ bị xóa tài khoản, đồng
                thời xóa toàn bộ bài đăng, bình luận của người dùng đó cũng như
                đưa email người dùng sử dụng đăng ký
              </span>
            </p>
            <ol className="text-xl font-bold mt-2 text-left" type="1">
              Xử phạt mức vi phạm
              <li className="text-base mt-2">
                1. Mức 1:{" "}
                <span>Các bài viết đánh dấu sai thẻ ở mức độ ít(1 thẻ)</span>
              </li>
              <li className="text-base mt-2">
                2. Mức 2:{" "}
                <span>
                  Các bài viết đánh dấu sai thẻ ở mức độ trung bình(2-4 thẻ)
                </span>
              </li>
              <li className="text-base mt-2">
                3. Mức 4:{" "}
                <span>
                  Các bài viết đánh dấu sai thẻ nhiều(4 thẻ trở lên), các bài
                  viết không liên quan đến chủ để công nghệ thông tin, các bài
                  viết có dấu hiệu spam
                </span>
              </li>
              <li className="text-base mt-2">
                {" "}
                <span className="text-red-600">
                  4. Mức 20 - Đồng nghĩa xóa tài khoản ngay lập tức:{" "}
                </span>
                <span>
                  Các bài viết có dấu hiệu thù địch, phản động, chia sẻ các
                  thông tin sai sự thật liên quan đến vấn đề an ninh chủ quyền
                  quốc gia
                </span>
              </li>
            </ol>
          </div>
          <h1 className="text-2xl text-left mt-8 font-bold">
            Mong mọi người tuân thủ tất cả các quy tắc để chúng tay xây dựng một
            diễn đàn Công nghệ thông tin và mang đến cho cộng đồng một nền tảng
            học hỏi và trao đổi kiến thức chất lượng.
          </h1>
        </div>
      )}
    </m.div>
  );
};

export default Guide;
