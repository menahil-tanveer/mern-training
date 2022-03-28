import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8082/api/";
const getAllUsers = () => {
  return axios.get(API_URL + "users/get-all-users", { headers: authHeader() });
};
const getAllCourses = () => {
  return axios.get(API_URL + "courses/get-all-courses", {
    headers: authHeader(),
  });
};
const updateProfile = async (payload) => {
  return await axios
    .put(API_URL + `admins/update-admin-info/${payload.adminId}`, payload, {
      headers: authHeader(),
      //   params: payload.id,
    })
    .then((response) => {
      if (response.data) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("update admin res", response.data);
      }
      return response.data;
    })
    .catch((error) => {
      console.log("profile update api error:", error);
    });
};
const userService = {
  getAllUsers,
  getAllCourses,
  updateProfile,
};
export default userService;
