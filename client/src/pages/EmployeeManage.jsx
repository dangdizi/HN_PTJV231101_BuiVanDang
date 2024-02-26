import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import ListUser from "../components/ListUser";
import Footer from "../components/Footer";
import FormModal from "../components/FormModal";
import LockModal from "../components/LockModal";
import DeleteModal from "../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { findAll } from "../service/user.service";

export default function EmployeeManage() {
  // trang thái modal biểu mẫu
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);

  // trạng thái modal xác nhận chặn
  const [isOpenLockModal, setIsOpenLockModal] = useState(false);

  // trạng thái modal xác nhận xóa
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // dữ liệu từ server
  const listUser = useSelector((state) => state.user.data);

  // state quản lý user được chọn để xóa hoặc chặn, bỏ chặn
  const [userSelect, setUserSelect] = useState(null);

  // dữ liệu để render ra form edit
  const [renderData, setRenderData] = useState(null);

  const dispatch = useDispatch();

  // hàm lấy tất cả user từ api, limit = 10
  const loadData = () => {
    dispatch(findAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <Header
            setRenderData={setRenderData}
            setIsOpenFormModal={setIsOpenFormModal}
          />
          <Search />
          {/* Danh sách nhân viên */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={2}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <ListUser
                setRenderData={setRenderData}
                setUserSelect={setUserSelect}
                listUser={listUser}
                setIsOpenDeleteModal={setIsOpenDeleteModal}
                setIsOpenLockModal={setIsOpenLockModal}
                setIsOpenFormModal={setIsOpenFormModal}
              />
            </tbody>
          </table>
          <Footer />
        </main>
      </div>
      {/* Form thêm mới nhân viên */}
      {isOpenFormModal && (
        <FormModal
          setRenderData={setRenderData}
          renderData={renderData}
          setIsOpenFormModal={setIsOpenFormModal}
        />
      )}

      {/* Modal xác nhận chặn tài khoản */}
      {isOpenLockModal && (
        <LockModal
          userSelect={userSelect}
          setIsOpenLockModal={setIsOpenLockModal}
        />
      )}
      {/* Modal xác nhận xóa tài khoản */}
      {isOpenDeleteModal && (
        <DeleteModal
          userSelect={userSelect}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
        />
      )}
    </>
  );
}
