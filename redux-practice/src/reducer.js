import * as actions from "./actionTypes";

let lastId = 0;
/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 * When app starts initially state is undefined, so when the reducer is called it sets it to an empty
   array
   @description A reducer is a pure function i.e. it always returns the same result no matter what
   the input. 
   Export this function as default object to be able to use it in other modules 
 */
function reducer(state = [], action) {
  //   if (actions.BUG_ADDED) {
  //     return [
  //       ...state,
  //       {
  //         id: lastId++,
  //         description: action.payload.description,
  //         resolved: "",
  //       },
  //     ];
  //   } else if (actions.BUG_REMOVED) {
  //     return state.filter((bug) => bug.id != action.payload.id);
  //   }
  //   return state;

  //--------------- OR USE SWITCH CASE INSTEAD -----------------
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: lastId++,
          description: action.payload.description,
          resolved: "",
        },
      ];
    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id != action.payload.id);
    case actions.BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );
    default:
      return state;
  }
}
export default reducer;
