import { createSlice, findNonSerializableValue } from "@reduxjs/toolkit";
import {
  findAll,
  findOne,
  insert,
  remove,
  updateStatus,
  updateUser,
} from "../../service/user.service";
import { message } from "antd";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(findAll.pending, (state) => {
        state.status = "pending";
      })
      .addCase(findAll.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(findAll.rejected, (state, action) => {
        state.status = action.error.message;
      })

      // -------------------------- insert -----------------------------------
      .addCase(insert.pending, (state) => {
        state.status = "pending";
      })
      .addCase(insert.fulfilled, (state, action) => {
        state.status = "successfully";
        const clone = [...state.data];
        clone.unshift(action.payload);
        state.data = clone;
      })
      .addCase(insert.rejected, (state, action) => {
        state.status = action.error.message;
      })

      // -------------------------- remove ------------------------
      .addCase(remove.pending, (state) => {
        state.status = "pending";
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.status = "successfully";

        // cập nhật lại bản ghi, loại bỏ user bị xóa
        state.data = state.data.filter((user) => user.id !== action.payload.id);
      })
      .addCase(remove.rejected, (state, action) => {
        state.status = action.error.message;
      })

      // -----------------------findOne--------------------------
      .addCase(findOne.pending, (state) => {
        state.status = "pending";
      })
      .addCase(findOne.fulfilled, (state, action) => {
        state.status = "successfully";

        // kiểm tra kết quả tìm kiếm
        if (action.payload.length > 0) {
          state.data = action.payload;
          message.success("Đã tìm thấy " + state.data.length + " kết quả");
        } else {
          message.warning("Không có kết quả tìm kiếm");
        }
      })
      .addCase(findOne.rejected, (state, action) => {
        state.status = action.error.message;
      })

      // -------------------------- updateStatus --------------------------------
      .addCase(updateStatus.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = "successfully";

        // cập nhật lại trạng thái hoạt động cho user
        state.data = state.data.map((user) => {
          if (user.id == action.payload.id) {
            user.status = user.status == 1 ? 0 : 1;
          }
          return user;
        });
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.status = action.error.message;
      })

      // ------------------------------- updateUser -------------------------------
      .addCase(updateUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "successfully";

        // cập nhật lại thay đổi cho bản ghi
        state.data = state.data.map((user) => {
          if (user.id == action.payload.id) {
            user = action.payload;
          }
          return user;
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = action.error.message;
      });
  },
});

export default userSlice.reducer;
