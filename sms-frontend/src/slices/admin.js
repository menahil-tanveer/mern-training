import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AdminService from "../services/admin.service";
// const user = JSON.parse(localStorage.getItem("user"));
export const updateAdminProfile = createAsyncThunk(
  "update/admin-profile",
  (payload, thunkAPI) => {
    try {
      const response = AdminService.updateProfile(payload);
      console.log("fetch res", response);
      thunkAPI.dispatch(setMessage(response.data.msg));
      return response.data;
    } catch (error) {
      console.log("updateAdminProfile error", error);
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return error;
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {},
  extraReducers: {
    // ALL USERS
    [updateAdminProfile.fulfilled]: (state, action) => {
      console.log("action fulfilled", action);
    },
    [updateAdminProfile.rejected]: (state, action) => {
      console.log("action rejected", action);
      //   state = null;
    },
  },
});
const { reducer } = adminSlice;
export default reducer;
