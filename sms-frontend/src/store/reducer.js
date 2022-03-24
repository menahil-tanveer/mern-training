import { combineReducers } from "redux";
import entitiesReducer from "./entities";
// this brings all aur reducers into a single umbrella of entities 
export default combineReducers({
  entities: entitiesReducer,
});
