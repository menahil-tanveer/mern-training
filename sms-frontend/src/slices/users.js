import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import UserService from "../services/user.service";
const user = JSON.parse(localStorage.getItem("user"));
export const fetchAllUsers = createAsyncThunk(
  "fetch/all-users",
  async (thunkAPI) => {
    try {
      const response = await UserService.getAllUsers();
      console.log("fetch res", response);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const authSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  extraReducers: {
    // ALL USERS
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload.data;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.users = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;
