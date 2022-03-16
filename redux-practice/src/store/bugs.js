import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
let lastId = 0;
/**
 * @description createSlice method replaces createAction & createReducer methods
 * Note that the name of reducers' properties can now be set to anything we want and it will be the only
 * place to update the name if we want to change it later in time unlike when we use createAction & createReducer
 *
 */
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (state, action) => {
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
  },
});
export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;
// Selectors
// This method is a bit expensive to use in apps cause it takes almost 0.5 seconds to execute even when
// the list of bugs has not chnaged.
// therefore we use memoization method instead. For that install reselect pckg

// export const getUnresolvedBugsOld = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);
