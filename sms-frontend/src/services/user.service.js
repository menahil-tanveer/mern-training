import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8082/api/";
// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };
const getAllUsers = () => {
  return axios.get(API_URL + "users/get-all-users", { headers: authHeader() });
};
const getAllCourses = () => {
  return axios.get(API_URL + "courses/get-all-courses", {
    headers: authHeader(),
  });
};
const getAllTeachers = () => {
  return axios.get(API_URL + "users/get-all-teachers", {
    headers: authHeader(),
  });
};
const userService = {
  //   getPublicContent,
  getAllUsers,
  getAllCourses,
  getAllTeachers,
};
export default userService;
