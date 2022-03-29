import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import CourseService from "../services/course.service";

// ADD NEW COURSE
export const createNewCourse = createAsyncThunk(
  "create/course",
  async (payload, thunkAPI) => {
    try {
      const response = await CourseService.createNewCourse(payload);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
// DELETE COURSE
export const deleteCourseById = createAsyncThunk(
  "delete/course",
  (payload, thunkAPI) => {
    try {
      const response = CourseService.deleteCourseById(payload);
      console.log("delete course slice res", response);
      return response;
    } catch (error) {
      console.log("delete course slice error", error);
      thunkAPI.dispatch(setMessage(error));
      return error;
    }
  }
);
// FETCH ALL COURSES
export const fetchAllCourses = createAsyncThunk("fetch/courses", async () => {
  try {
    const response = await CourseService.getAllCourses();
    console.log("fetch res", response);
    return response.data;
  } catch (error) {
    return error;
  }
});
const courseSlice = createSlice({
  name: "courses",
  initialState: {
    allCourses: [],
  },
  reducers: {
    courseAdded: (state, action) => {
      state.allCourses.push(action.payload);
    },
    courseDeleted: (state, action) => {
      state.allCourses = state.allCourses.filter(
        (course) => course.courseId !== action.payload.courseId
      );
    },
  },
  extraReducers: {
    [fetchAllCourses.fulfilled]: (state, action) => {
      console.log("action fulfilled action.payload", action.payload);
      state.allCourses = action.payload;
    },
    [fetchAllCourses.rejected]: (state, action) => {
      console.log("action rejected", action);
    },
  },
});
const { reducer } = courseSlice;
export const { courseAdded, courseDeleted } = courseSlice.actions;

export default reducer;

// SELECTORS
export const getAllCourses = (state) =>
  state.courses.allCourses.map((course) => course);

