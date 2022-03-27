import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";
const user = JSON.parse(localStorage.getItem("user"));
export const register = createAsyncThunk(
  "auth/register",
  async ({ adminId, fullName, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        adminId,
        fullName,
        email,
        password
      );
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
export const login = createAsyncThunk(
  "auth/login",
  async ({ adminId, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(adminId, password);
      return { user: data };
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
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ userId, password }, thunkAPI) => {
    try {
      const data = await AuthService.userLogin(userId, password);
      return { user: data };
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
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});
const initialState = user
  ? { isLoggedIn: true, user, role: user.role }
  : { isLoggedIn: false, user: null, role: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    // ADMIN
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.registered = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.registered = false;
    },
    [login.fulfilled]: (state, action) => {
      console.log("admin login fulfilled", action);
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.role = action.payload.user.user.role;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    // USER
    [userLogin.fulfilled]: (state, action) => {
      console.log("user login fulfilled", action);

      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.role = action.payload.user.user.role;
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    // GENERAL
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;
