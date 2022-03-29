import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import UserService from "../services/user.service";
// const user = JSON.parse(localStorage.getItem("user"));
export const createNewUser = createAsyncThunk(
  "create/new-user",
  async (payload, thunkAPI) => {
    try {
      const response = await UserService.createNewUser(payload);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "update/user-profile",
  (payload, thunkAPI) => {
    try {
      const response = UserService.updateProfile(payload);
      console.log("fetch res", response);
      return response;
    } catch (error) {
      console.log("updateAdminProfile error", error);
      thunkAPI.dispatch(setMessage(error));
      return error;
    }
  }
);
export const deleteUserById = createAsyncThunk(
  "update/delete-user",
  (payload, thunkAPI) => {
    try {
      const response = UserService.deleteUserById(payload);
      console.log("delete user slice res", response);
      return response;
    } catch (error) {
      console.log("delete user slice error", error);
      thunkAPI.dispatch(setMessage(error));
      return error;
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
export const fetchUserById = createAsyncThunk(
  "fetch/current-user",
  async (payload, thunkAPI) => {
    try {
      const response = await UserService.getUserById(payload);
      console.log("fetch res", response);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const enrollCourse = createAsyncThunk(
  "enroll/course",
  async (payload, thunkAPI) => {
    try {
      const response = await UserService.enrollCourse(payload);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    currentUser: "",
  },
  reducers: {
    userAdded: (state, action) => {
      state.allUsers.push(action.payload);
    },
    userDeleted: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user.userId !== action.payload.userId
      );
    },
    courseEnrolled: (state, action) => {
      state.currentUser.Courses.push(action.payload);
    },
  },
  extraReducers: {
    // ALL USERS
    [fetchAllUsers.fulfilled]: (state, action) => {
      console.log("action fulfilled action.payload", action.payload);
      state.allUsers = action.payload;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      console.log("action rejected", action);
    },
    // CURRENT USER
    [fetchUserById.fulfilled]: (state, action) => {
      console.log("fetchUserById fulfilled action.payload", action.payload);
      state.currentUser = action.payload;
    },
    [fetchUserById.rejected]: (state, action) => {
      console.log("action rejected", action);
    },
    [createNewUser.fulfilled]: (state, action) => {
      console.log("createNewUser action fullfilled", action);
    },
    [createNewUser.rejected]: (state, action) => {
      console.log("createNewUser action rejected", action);
    },
    [deleteUserById.fulfilled]: (state, action) => {
      console.log("deleteUserById.fulfilled", action.payload);
    },
  },
});
const { reducer } = userSlice;
export const { userAdded, userDeleted, courseEnrolled } = userSlice.actions;

export default reducer;

// SELECTORS
export const getAllUsers = (state) => state.users.allUsers.map((user) => user);
export const getCurrentUser = (state) => state.users.currentUser;
export const getCurrentUserCourses = (state) => state.users.currentUser.Courses;
