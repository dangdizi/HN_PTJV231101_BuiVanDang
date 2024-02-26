import React from "react";

export default function Header({ setIsOpenFormModal, setRenderData }) {
  return (
    <header className="d-flex justify-content-between mb-3">
      <h3>Nhân viên</h3>
      <button
        onClick={() => {
          setRenderData(null);
          setIsOpenFormModal(true);
        }}
        className="btn btn-primary"
      >
        Thêm mới nhân viên
      </button>
    </header>
  );
}
