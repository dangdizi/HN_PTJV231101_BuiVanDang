import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../useSlice/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
export default store;
