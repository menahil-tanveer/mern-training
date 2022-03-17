/**
 *
 * @param {*} store the store over here is not the actual store but an object that looks like it. This one only has
 * getState & dispatch properties
 * @param {*} next i.e. a refernce to next middleware function & if its the only one then reducer that
 * is going to handle this action
 * @param {*} action i.e. the action that is dispatched
 * @description
 * This method is supposed to log each dispatched action like the devtools
 * Originally it is written as:
 * const logger = (store, next, action) => {}
 * Implement curring i.e. convert a function with multiple params into multiple functions each with
 * a single parameter
 * to parameterise a middleware simply:
 */
const logger = (params) => () => (next) => (action) => {
  console.log("logging", params);
  // this will lead to reducer function which will alter the state
  next(action);
};
export default logger;
