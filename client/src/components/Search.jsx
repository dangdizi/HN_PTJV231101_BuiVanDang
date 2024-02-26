import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findAll, findOne } from "../service/user.service";
import debounce from "lodash.debounce";
import { message } from "antd";
export default function Search() {
  const dispatch = useDispatch();
  // state search key
  const [searchKey, setSearchKey] = useState("");

  // sự kiện thay đổi form
  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  // hàm tìm kiếm email
  const loadData = () => {
    dispatch(findOne(searchKey));
  };

  // sự kiện hoàn tác bản ghi
  const handleRefresh = () => {
    dispatch(findAll());
    message.success("Đã hoàn tác bản ghi");
  };

  useEffect(() => {
    if (searchKey == "") {
      return;
    }
    const db = debounce(loadData, 1000);
    db();
    return db.cancel;
  }, [searchKey]);
  return (
    <>
      <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
        <input
          onChange={handleChange}
          style={{ width: 350 }}
          type="text"
          className="form-control"
          placeholder="Tìm kiếm theo email"
          value={searchKey}
        />

        <i
          onClick={() => {
            handleRefresh();
          }}
          className="fa-solid fa-arrows-rotate"
          title="Refresh"
        />
      </div>
      <span className="my-3 d-block error"></span>
    </>
  );
}
