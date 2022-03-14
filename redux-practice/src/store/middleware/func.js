const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // if the action that is dispatched is a function then execute that function
    if (typeof action == "function") {
      action(dispatch, getState);
    }
    // else pass it to the next middleware function or the reducer
    else {
      next(action);
    }
  };
export default func;

// NOTE: this middleware is present by default in redux toolkit. it is called thunk. You can use that instead of this in
// your store
