import axios from "axios";
import * as actions from "../../actions";
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    console.log("TYPE: apiCallBegan", actions.apiCallBegan.type);
    // next(action); // if not placed here, this action will be swallowed and redux will move onto the actions defined below this
    const { url, method, data, onStart, onSucces, onError } = action;
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: "http://localhost:8082/api/users/get-all-students",
        url,
        method,
        data,
      });
      //general
      console.log("dispatch success action");
      dispatch(actions.apiCallSuccess(response.data));
      // sepcific
      if (onSucces) dispatch({ type: onSucces, payload: response.data });
    } catch (error) {
      // general error message
      dispatch(actions.apiCallFailed(error));
      // specific error message
      if (onError) dispatch({ type: onError, payload: error });
    }
  };
export default api;
