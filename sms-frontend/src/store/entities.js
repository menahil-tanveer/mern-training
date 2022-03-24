import { combineReducers } from "redux";
// import bugsReducer from "./bugs";
import usersReducer from "./users";

export default combineReducers({
  // bugs: bugsReducer,
  users: usersReducer,
});
