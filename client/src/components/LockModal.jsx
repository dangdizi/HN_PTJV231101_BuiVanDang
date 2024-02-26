import React from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../service/user.service";
import { message } from "antd";
export default function LockModal({ userSelect, setIsOpenLockModal }) {
  const dispatch = useDispatch();

  // hàm chặn user
  const handleLockUser = () => {
    dispatch(updateStatus(userSelect)); // gửi yêu cầu thay đổi trạng thái lên server
    setIsOpenLockModal(false); // đóng modal
    message.success("cập nhật thành công!"); // hiển thị message thông báo thành công
  };

  return (
    <>
      <div className="overlay" hidden="">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i
              onClick={() => {
                setIsOpenLockModal(false);
              }}
              className="fa-solid fa-xmark"
            />
          </div>
          <div className="modal-body-custom">
            <span>
              Bạn có chắc chắn muốn{" "}
              {userSelect.status == 0 ? <b>chặn</b> : <b>bỏ chặn </b>} tài khoản
              này?
            </span>
          </div>
          <div className="modal-footer-custom">
            <button
              onClick={() => {
                setIsOpenLockModal(false);
              }}
              className="btn btn-light"
            >
              Hủy
            </button>
            <button onClick={handleLockUser} className="btn btn-danger">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
