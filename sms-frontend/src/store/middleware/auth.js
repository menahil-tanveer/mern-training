// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// /**
//  * @description This method is responsible for registering admins
//  *
//  */
// // ACTIONS
// const BASE_URL = "http://localhost:8082/api";
// // SIGNUP
// export const signUp = createAsyncThunk("/createNewAdmin", async (payload) => {
//   console.log("signup payload:::", payload);
//   const { adminId, fullName, email, password } = payload;
//   const response = await axios.post(`${BASE_URL}/admins/create-new-admin`, {
//     adminId,
//     fullName,
//     email,
//     password,
//   });
//   console.log("signup api res:::", response);
//   return response.data;
// });
// // LOGIN
// // admin
// export const adminLogin = createAsyncThunk(
//   "/adminLogin",
//   async (payload, thunkAPI) => {
//     console.log("thunkAPI::::", thunkAPI);
//     const { adminId, password } = payload;
//     const response = await axios.post(`${BASE_URL}/admins/admin-login`, {
//       adminId,
//       password,
//     });
//     console.log("admin login api res:::", response);
//     window.localStorage.setItem("auth-token", response.data.token);
//     return response.data;
//   }
// );
// // user
// export const userLogin = createAsyncThunk("/userLogin", async (payload) => {
//   const { userId, password } = payload;
//   const response = await axios.post(`${BASE_URL}/users/login`, {
//     userId,
//     password,
//   });
//   console.log("user login api res:::", response);
//   return response.data;
// });
// // SLICE
// // Signup
// const slice = createSlice({
//   name: "auth",
//   initialState: {
//     signupResponse: false,
//     currentUser: "",
//   },
//   extraReducers: {
//     [signUp.pending]: () => {
//       console.log("Pending...");
//     },
//     [signUp.fulfilled]: (state, { payload }) => {
//       console.log("Fetched Successfully...", payload);
//       return { ...state, signupResponse: true };
//     },
//     [signUp.rejected]: () => {
//       console.log("Rejected...");
//     },
//     [adminLogin.fulfilled]: (state, { payload }) => {
//       console.log("admin should be logged in", payload);
//       return { ...state, currentUser: payload };
//     },
//   },
// });
// export const { userRegistered } = slice.actions;
// export default slice.reducer;
