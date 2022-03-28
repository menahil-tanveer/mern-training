import axios from "axios";
const API_URL = "http://localhost:8082/api/";
const register = (adminId, fullName, email, password) => {
  return axios.post(API_URL + "admins/create-new-admin", {
    adminId,
    fullName,
    email,
    password,
  });
};
const userLogin = async (userId, password) => {
  return await axios
    .post(API_URL + "users/login", {
      userId,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};
const login = async (adminId, password) => {
  return await axios
    .post(API_URL + "admins/admin-login", {
      adminId,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        console.log("response.data:::", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.admin));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
const authService = {
  register,
  userLogin,
  login,
  logout,
};
export default authService;
