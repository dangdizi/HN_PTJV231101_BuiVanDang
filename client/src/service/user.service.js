import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../api";

// hàm lấy data
export const findAll = createAsyncThunk("user/findAll", async (limit = 10) => {
  try {
    const response = await baseUrl.get("users?_limit=" + limit);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// hàm thêm user
export const insert = createAsyncThunk("user/insert", async (data) => {
  try {
    const response = await baseUrl.post("users", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// hàm xóa user từ id
export const remove = createAsyncThunk("user/remove", async (id) => {
  try {
    const response = await baseUrl.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// hàm tìm kiếm user từ email
export const findOne = createAsyncThunk("user/findOne", async (email) => {
  try {
    const response = await baseUrl.get(`users?email=${email}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// hàm chặn và mở chặn user
export const updateStatus = createAsyncThunk(
  "user/updateStatus",
  async (user) => {
    try {
      const response = await baseUrl.patch(`users/${user.id}`, {
        status: user.status == 0 ? 1 : 0,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// hàm cập nhật user
export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  try {
    const id = user.id; // user id
    const userClone = { ...user }; // dữ liệu cập nhật
    delete userClone.id; // xóa id trong dữ liệu cập nhật
    const response = await baseUrl.patch(`users/${id}`, userClone);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
