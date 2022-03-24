/**
 * Author: Menahil
 * Date: 23-03-22
 * Purpose: This component is responsible for making API requests
 */
import axios from "axios";
const BASE_URL = "http://localhost:8082/api/";
// export const signup = (payload) => {
//   console.log("api payload", payload);
//   try {
//     axios.post(`${BASE_URL}admins/create-new-admin`, payload).then((res) => {
//       console.log("res:::", res);
//     });
//     console.log("onSuccess");
//   } catch (error) {
//     // General error message
//     console.log("Error:", error);
//   }
// };

export const signup = (payload) =>
  new Promise((resolve, reject) => {
    try {
      axios.post(`${BASE_URL}admins/create-new-admin`, payload).then((res) => {
        console.log("res:::", res);
        resolve();
      });
    } catch (error) {
      console.log("ello!", error);
      reject(error);
    }
  });
