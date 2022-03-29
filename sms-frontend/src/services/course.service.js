import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8082/api/";

const getAllCourses = () => {
  return axios.get(API_URL + "courses/get-all-courses", {
    headers: authHeader(),
  });
};
const createNewCourse = async (payload) => {
  return await axios
    .post(API_URL + `courses/create-new-course`, payload, {
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data) {
        console.log("new course api res", response.data);
      }
      return response.data;
    })
    .catch((error) => {
      console.log("new course api error:", error);
    });
};
const deleteCourseById = async (payload) => {
  console.log("delete payload", payload);
  return await axios
    .delete(API_URL + `courses/delete-course/${payload.courseId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data) {
        console.log("delete course res", response.data);
      }
      return response.data;
    })
    .catch((error) => {
      console.log("course delete api error:", error);
    });
};
const courseService = {
  getAllCourses,
  createNewCourse,
  deleteCourseById,
};
export default courseService;
