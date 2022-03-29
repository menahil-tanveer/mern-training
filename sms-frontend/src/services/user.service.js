import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8082/api/";
// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };
const getAllUsers = () => {
  return axios.get(API_URL + "users/get-all-users", { headers: authHeader() });
};
const createNewUser = async (payload) => {
  return await axios
    .post(API_URL + `users/create-new-user`, payload, {
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data) {
        console.log("new user api res", response.data);
      }
      return response.data;
    })
    .catch((error) => {
      console.log("new user api error:", error);
    });
};
const updateProfile = async (payload) => {
  return await axios
    .put(API_URL + `users/update-user-info/${payload.userId}`, payload, {
      headers: authHeader(),
      //   params: payload.id,
    })
    .then((response) => {
      if (response.data) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("update user res", response.data);
      }
      return response.data;
    })
    .catch((error) => {
      console.log("user profile update api error:", error);
    });
};
const deleteUserById = async (payload) => {
  console.log("delete payload", payload);
  return await axios
    .delete(API_URL + `users/delete-user/${payload.userId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data) {
        console.log("delete user res", response.data);
      }
      return response.data;
    })
    .catch((error) => {
      console.log("user delete api error:", error);
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
  //   getAllCourses,
  getAllTeachers,
  createNewUser,
  updateProfile,
  deleteUserById,
};
export default userService;