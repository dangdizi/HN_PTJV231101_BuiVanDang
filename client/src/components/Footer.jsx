import React from "react";
import { useDispatch } from "react-redux";
import { findAll } from "../service/user.service";
import { message } from "antd";

export default function Footer() {
  const dispatch = useDispatch();

  // reload lại data số lượng bản ghi
  const handleLimit = (e) => {
    const value = e.target.value;
    dispatch(findAll(value)); // gửi lên server với giá trị limit
    message.success("Đã cập nhật thành " + value + " bản ghi");
  };
  return (
    <footer className="d-flex justify-content-end">
      <div className="d-flex align-items-center gap-3">
        <select
          onChange={handleLimit}
          defaultValue={10}
          className="form-select"
        >
          <option value={10}>Hiển thị 10 bản ghi trên trang</option>
          <option value={20}>Hiển thị 20 bản ghi trên trang</option>
          <option value={50}>Hiển thị 50 bản ghi trên trang</option>
          <option value={100}>Hiển thị 100 bản ghi trên trang</option>
        </select>
      </div>
    </footer>
  );
}
