import reducer from "./reducer";
import logger from "./middleware/logger";
import displayToast from "./middleware/displayToast";
import api from "./middleware/api";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
/**
 * @description
 * This method is responsible for store configuration
 * Applying middleware without using redux toolkit:
 * const store = createStore(reducer, devToolsEnhancer({ trace: true }));
 * Redux toolkit contains a bunch of functions that simplifies things for us. Here onwards we will use redux toolkit.
 * @returns store
 *
 */
export default function () {
  // Always pass a refernce of the function donot call it i.e. write 'reducer' NOT 'reducer()'
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ test: "1" }),
      api,
      displayToast,
    ],
    // Note: the order of middlewares matter & getDefaultMiddleware gets an array of all the middlewares
    // whereas spread operator is used to copy them
  });
}
