import React from "react";
import formatDate from "../utils/formatDate";
import { useDispatch } from "react-redux";

export default function ListUser({
  listUser,
  setIsOpenDeleteModal,
  setUserSelect,
  setIsOpenLockModal,
  setRenderData,
  setIsOpenFormModal,
}) {
  const dispatch = useDispatch();

  return (
    <>
      {/* render data ra giao diện */}
      {listUser.map((user, index) => (
        <tr key={user.id}>
          <td>{index + 1}</td>
          <td>{user.user_name}</td>
          <td>{formatDate(user.date_of_birth)}</td>
          <td>{user.email}</td>
          <td>{user.address == "" ? "chưa cập nhật" : user.address}</td>
          <td>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {user.status == 0 ? (
                <div className="status status-active" />
              ) : (
                <div className="status status-stop" />
              )}

              <span>
                {user.status == 0 ? "Đang hoạt động" : "Ngừng hoạt động"}
              </span>
            </div>
          </td>
          <td>
            <span
              onClick={() => {
                setIsOpenLockModal(true);
                setUserSelect(user);
              }}
              className="button button-block"
            >
              {user.status == 0 ? "Chặn" : "Bỏ chặn"}
            </span>
          </td>
          <td>
            <span
              onClick={() => {
                setRenderData(user);
                setIsOpenFormModal(true);
              }}
              className="button button-edit"
            >
              Sửa
            </span>
          </td>
          <td>
            <span
              onClick={() => {
                setIsOpenDeleteModal(true);
                setUserSelect(user);
              }}
              className="button button-delete"
            >
              Xóa
            </span>
          </td>
        </tr>
      ))}
    </>
  );
}
