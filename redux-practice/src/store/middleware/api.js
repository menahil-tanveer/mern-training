import axios from "axios";
import { usersAdded } from "../users";
import * as actions from "../api"
const api =
  ({ dispatch }) =>
  (next) =>
      async (action) => {
      console.log("action:",action)
    if (action.type !== "api/CallBegan") return next(action);
    next(action); // if not placed here, this action will be swallowed and redux will move onto the actions defined below this
    const { url, onSuccess, onError } = action.payload;
    // if (onStart) dispatch({ type: onStart });
    // next(action);
    try {
      const response = await axios.request({
        baseURL: "https://jsonplaceholder.typicode.com/users",
        // data, // optional
      });
      console.log("onSuccess");
      if (onSuccess) dispatch(usersAdded(response.data));
    } catch (error) {
      // General error message
      dispatch(actions.apiCallFailed(error));
      // Specific error message
      if (onError) dispatch({ type: onError, payload: error });
    }
  };
export default api;
