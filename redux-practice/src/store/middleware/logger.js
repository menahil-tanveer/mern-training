console.log("logger!!");
/**
 *
 * @param {*} store
 * @param {*} next i.e. a refernce to next middleware function & if its the only one then reducer that
 * is going to handle this action
 * @param {*} action i.e. the action that is dispatched
 */
// const logger = (store, next, action) => {
// }
// implement curring i.e. convert a function with multiple params into multiple functions each with
// a single parameter

// to parameterise a middleware simply:
const logger = (params) => (store) => (next) => (action) => {
  console.log("logging", params);
  // this will lead to reducer function which will alter the state
  next(action);
};
export default logger;
