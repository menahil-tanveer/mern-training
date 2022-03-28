import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import UserService from "../services/user.service";
// const user = JSON.parse(localStorage.getItem("user"));
export const createNewUser = createAsyncThunk(
  "create/new-user",
  async (payload, thunkAPI) => {
    try {
      const response = await UserService.createNewUser(payload);
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
export const fetchAllUsers = createAsyncThunk("fetch/all-users", async () => {
  try {
    const response = await UserService.getAllUsers();
    console.log("fetch res", response);
    return response.data;
  } catch (error) {
    return error;
  }
});
const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
  },
  extraReducers: {
    // ALL USERS
    [fetchAllUsers.fulfilled]: (state, action) => {
      console.log("action fulfilled action.payload", action.payload);
      state.allUsers = action.payload;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      console.log("action rejected", action);
      //   state = null;
    },
  },
});
const { reducer } = userSlice;
export default reducer;

// SELECTORS
export const getAllUsers = (state) => state.users.allUsers.map((user) => user);
