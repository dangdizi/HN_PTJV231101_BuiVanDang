import React from "react";
import { useDispatch } from "react-redux";
import { remove } from "../service/user.service";
import { message } from "antd";

export default function DeleteModal({ setIsOpenDeleteModal, userSelect }) {
  const dispatch = useDispatch();
  // hàm xác nhận xóa
  const confirmDelete = () => {
    dispatch(remove(userSelect.id));
    setIsOpenDeleteModal(false);
    message.success("Xóa thành công");
  };

  return (
    <div className="overlay" hidden="">
      <div className="modal-custom">
        <div className="modal-title">
          <h4>Cảnh báo</h4>
          <i
            onClick={() => {
              setIsOpenDeleteModal(false);
            }}
            className="fa-solid fa-xmark"
          />
        </div>
        <div className="modal-body-custom">
          <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
        </div>
        <div className="modal-footer-custom">
          <button
            onClick={() => {
              setIsOpenDeleteModal(false);
            }}
            className="btn btn-light"
          >
            Hủy
          </button>
          <button onClick={confirmDelete} className="btn btn-danger">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
