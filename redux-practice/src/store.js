import { createStore } from "redux";
import reducer from "./reducer";
//always pass a refernce of the function donot call it i.e. reducer()
const store = createStore(reducer);
export default store;
