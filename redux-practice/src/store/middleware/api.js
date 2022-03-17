import axios from "axios";
import { usersAdded } from "../users";
const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== "apiCallBegan") return next(action);
    next(action); // if not placed here, this action will be swallowed and redux will move onto the actions defined below this
    // const { url, onSuccess, onError } = action;
    // if (onStart) dispatch({ type: onStart });
    // next(action);
    try {
      const response = await axios.request({
        baseURL: "https://jsonplaceholder.typicode.com/users",
        // data, // optional
      });
      //general
      // dispatch(action.payload.apiCallSuccess(response.data));
      // sepcific
      console.log("onSuccess");
      if (action.payload.onSuccess) dispatch(usersAdded(response.data));
      //   dispatch({ type: action.payload.onSuccess, payload: response.data });
      console.log("users", response.data);
      next(action);
    } catch (error) {
      // general error message
      //   dispatch(action.payload.apiCallFailed(error));
      // specific error message
      if (action.payload.onError)
        dispatch({ type: action.payload.onError, payload: error });
    }
  };
export default api;
