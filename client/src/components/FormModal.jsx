import React, { useEffect, useState } from "react";
import checkEmailValid from "../utils/checkEmailValid";
import { useDispatch } from "react-redux";
import { insert, updateUser } from "../service/user.service";
import { message } from "antd";
export default function FormModal({
  renderData,
  setIsOpenFormModal,
  setRenderData,
}) {
  const dispatch = useDispatch();
  // đối tượng trên form
  const [userInput, setUserInput] = useState(() => {
    // nếu có renderData thì dùng không thì tạo ra đối tượng rỗng
    return (
      renderData || {
        user_name: "",
        date_of_birth: "",
        email: "",
        address: "",
        status: 0,
      }
    );
  });

  // thông báo lỗi validate trên form
  const [error, setError] = useState(() => {
    return {
      user_name: "",
      date_of_birth: "",
      email: "",
    };
  });

  // sự kiện onchange và validate trong form
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value == "") {
      // kiểm tra nếu dữ liệu bị bỏ trống
      let message;
      if (name == "user_name") {
        message = "Họ và tên không được để trống.";
      } else if (name == "email") {
        message = "Email không được để trống.";
      } else if (name == "date_of_birth") {
      } else {
        message = "";
      }
      setUserInput({ ...userInput, [name]: "" }); // cập nhật lại giá trị là rỗng nếu dữ liệu không hợp lệ
      setError({ ...error, [name]: message }); // thông báo lỗi cho người dùng
      return;
    } else {
      if (name == "email") {
        // kiểm tra định dạng email
        const check = checkEmailValid(value);
        if (!check) {
          let message = "Email không đúng định dạng!";
          setError({ ...error, [name]: message });
          return;
        } else {
          setError({ ...error, [name]: "" });
        }
      }

      setUserInput({ ...userInput, [name]: value }); // cập nhật giá trị input value
      setError({ ...error, [name]: "" }); // xóa lỗi
    }
  };

  // sự kiện submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // chặn load lại trang

    // kiểm tra lại validate
    const userTime = new Date(userInput.date_of_birth).getTime();
    const nowTime = new Date().getTime();
    if (userTime - nowTime > 1) {
      // kiểm tra ngày sinh hợp lệ
      setError({
        ...error,
        date_of_birth: "Ngày sinh không lớn hơn ngày hiện tại!",
      });
      return;
    } else if (userInput.date_of_birth == "") {
      // kiểm tra trường này có bị trống không
      setError({
        ...error,
        date_of_birth: "Không được bỏ trống ngày sinh",
      });
      return;
    } else if (userInput.user_name == "") {
      // kiểm tra họ tên
      setError({
        ...error,
        user_name: "Họ và tên không được bỏ trống!",
      });
      return;
    } else if (!checkEmailValid(userInput.email)) {
      // kiểm tra valid email
      setError({
        ...error,
        email: "Email không đúng định dạng",
      });
      return;

      // kiểm tra ngày sinh
    } else {
      if (!renderData) {
        // kiểm tra xem nếu có renderData tức là edit còn không sẽ là thêm mới
        // thêm mới user
        dispatch(insert(userInput));
        setIsOpenFormModal(false);
        message.success("Đã thêm user thành công!");
      } else {
        // cập nhật lại thông tin của user
        dispatch(updateUser(userInput));
        setIsOpenFormModal(false);
        message.success("Đã cập nhật user thành công!");
      }
    }
  };

  // thực hiện renderData
  return (
    <div className="overlay" hidden="">
      <form onSubmit={handleSubmit} className="form">
        <div className="d-flex justify-content-between align-items-center">
          <h4>{!renderData ? "Thêm mới nhân viên" : "Cập nhật nhân viên"}</h4>
          <i
            onClick={() => {
              setIsOpenFormModal(false);
            }}
            className="fa-solid fa-xmark"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="userName">
            Họ và tên
          </label>
          <input
            id="userName"
            type="text"
            className="form-control"
            name="user_name"
            onChange={handleChange}
            defaultValue={userInput.user_name}
          />
          <div className="form-text error">{error.user_name}</div>
        </div>
        <div>
          <label className="form-label" htmlFor="dateOfBirth">
            Ngày sinh
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className="form-control"
            name="date_of_birth"
            onChange={handleChange}
            defaultValue={userInput.date_of_birth}
          />
        </div>
        <div className="form-text error">{error.date_of_birth}</div>
        <div>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="form-control"
            name="email"
            onChange={handleChange}
            defaultValue={userInput.email}
          />
        </div>
        <div className="form-text error">{error.email}</div>
        <div>
          <label className="form-label" htmlFor="address">
            Địa chỉ
          </label>
          <textarea
            className="form-control"
            id="address"
            rows={3}
            name="address"
            onChange={handleChange}
            defaultValue={userInput.address}
          />
        </div>
        <div>
          <button className="w-100 btn btn-primary">
            {!renderData ? "Thêm mới" : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
