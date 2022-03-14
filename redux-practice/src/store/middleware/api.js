import axios from "axios";
import * as actions from '../../actions'
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan) return next(action);
    next(action); // if not placed here, this action will be swallowed and redux will move onto the actions defined below this
    const { url, method, data, onSucces, onError } = action;
    try {
      const response = await axios.request({
        baseURL: "http://localhost:8082/api/users/get-all-students",
        url,
        method,
        data,
      });
      dispatch({ type: onSucces, payload: response.data });
    } catch (error) {
      dispatch({ type: onError, payload: error });
    }
  };
export default api;
