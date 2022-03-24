import reducer from "./reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import api from "./middleware/api";
/**
 * @description
 * This method is responsible for store configuration
 * @returns store
 *
 */
export default function () {
  // Always pass a refernce of the function donot call it i.e. write 'reducer' NOT 'reducer()'
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
    // Note: the order of middlewares matter & getDefaultMiddleware gets an array of all the middlewares
    // whereas spread operator is used to copy them
  });
}
