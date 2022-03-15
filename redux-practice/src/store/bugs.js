import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
// ACTION TYPES
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";
// ACTION CREATORS: manual approach
// export const bugAdded = (description) => ({
//   type: BUG_ADDED,
//   payload: {
//     description,
//   },
// });
// ACTION CREATORS: concise approach using redux toolkit
// createAction method creates an action creator
// createAction has a type property that can be used to return action type (it can also be done using toString method)
// Example:
// const apiCallBegan = createAction("api/callBegan");
// console.log(apiCallBegan.type) || console.log(apiCallBegan.toString())
// to define payload:
// console.log(apiCallBegan({id:1})) this will add id as a property of payload obj
export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");
// REDUCER
// Note: reducer must always be a default export when following ducks pattern
let lastId = 0;
// function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: lastId++,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);
//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//       );
//     default:
//       return state;
//   }
// }
// export default reducer;

// CREATING REDUCER USING TOOLKIT
// NOTE: The name of action creators and reducer properties should be the same
// To make this less prone to error, we can name the reducer dynamically like below
// the parameter state can also be assigned a custom name for readibility e.g. in this case it can be called
// bugs
export default createReducer([], {
  [bugAdded.type]: (state, action) => {
    state.push({
      id: lastId++,
      description: action.payload.description,
      resolved: false,
    });
  },
  bugResolved: (state, action) => {
    const index = state.findIndex((bug) => bug.id === action.payload.id);
    state[index].resolved = true;
  },
});
// const slice = createSlice({
//   name: "bugs",
//   initialState: {
//     list: [],
//     loading: false,
//     lastFetch: null,
//   },
//   // ---------------------------- REDUCERS--------------------------
//   reducers: {
//     bugsRequested: (bugs, action) => {
//       bugs.loading = true;
//     },
//     bugsReceived: (bugs, action) => {
//       bugs.list = action.payload;
//       bugs.loading = false;
//     },
//   },
// });

// export const { bugsRequested, bugsReceived } = slice.actions;
// export default slice.reducer;

// const url = "bugs/bugsRequested";
// export const loadBugs = () => {
//   apiCallBegan({
//     url,
//     onStart: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//   });
// };
