// import { createStore } from "redux";
import reducer from "./reducer";
// import logger from "./store/middleware/logger";
// import displayToast from "./store/middleware/displayToast";
// import api from "./store/middleware/api";
// import { devToolsEnhancer } from "redux-devtools-extension";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// import func from "./store/middleware/func";

//always pass a refernce of the function donot call it i.e. write 'reducer' rather than 'reducer()'

// This is how a middleware is applied without using redux toolkit
// const store = createStore(reducer, devToolsEnhancer({ trace: true }));

// //REDUX TOOLKIT (simplifies REDUX code)
// // const store = configureStore({
// //   reducer,
// //   middleware: [...getDefaultMiddleware(), logger("console"), displayToast, api], //note: the order of middlewares matter & getDefaultMiddleware gets an array of all the middlewares && spread operator is used to copy them
// // });

// // passing a function in dispatch
// // here, type of this action is function
// store.dispatch((dispatch, getState) => {
//   // Call an API
//   // If promise is resolved, dispatch this
//   dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
//   console.log("getState", getState());
//   // If promise is rejected, dispatch that
// });
// // console.log("dispatch error action::");
// store.dispatch({
//   type: "error",
//   payload: {
//     message: "An error has occurred",
//   },
// });
// export default store;

// Redux toolkit contains a bunch of functions that simplifies things for us.
// Here onwards we will use redux toolkit.
import { configureStore } from "@reduxjs/toolkit";
export default function () {
  return configureStore({ reducer });
}
