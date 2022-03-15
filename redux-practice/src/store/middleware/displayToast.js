const displayToast = (store) => (next) => (action) => {
  console.log("action:::", action);
  action.type === "error"
    ? console.log("Error:", action.payload.message)
    : next(action);
};
export default displayToast;
