import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import UserService from "../services/user.service";
const user = JSON.parse(localStorage.getItem("user"));
export const fetchAllUsers = createAsyncThunk("fetch/all-users", async () => {
  try {
    const response = await UserService.getAllUsers();
    console.log("fetch res", response);
    //   thunkAPI.dispatch(setMessage(response.data.message));
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    //   thunkAPI.dispatch(setMessage(message));
    return error;
  }
});

const authSlice = createSlice({
  name: "users",
  initialState: [],
  extraReducers: {
    // ALL USERS
    [fetchAllUsers.fulfilled]: (state, action) => {
      console.log("action fulfilled", action);
      //   state.push(...action.payload);
    },
    [fetchAllUsers.rejected]: (state, action) => {
      console.log("action rejected", action);
      //   state = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;
