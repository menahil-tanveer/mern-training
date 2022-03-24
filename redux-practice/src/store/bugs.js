import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
let lastId = 0;
/**
 * @description createSlice method replaces createAction & createReducer methods
 * Note that the name of reducers' properties can now be set to anything we want and it will be the only
 * place to update the name if we want to change it later in time unlike when we use createAction & createReducer
 *
 */
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // name: bugs/bugAdded
    bugAdded: (state, action) => {
      state.list.push({
        id: lastId++,
        description: action.payload.description,
        resolved: false,
      });
    },
    // name: bugs/bugAssigned
    bugAssigned: (state, action) => {
      const { bugId, userId } = action.payload;
      const index = state.list.findIndex((bug) => bug.id === bugId);
      // set user id property in bugs array
      state.list[index].userId = userId;
    },
    // name: bugs/bugResolved
    bugResolved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[index].resolved = true;
    },
  },
});
export const { bugAdded, bugResolved, bugAssigned } = slice.actions;
export default slice.reducer;

// SELECTORS
// This method is a bit expensive to use in apps cause it takes almost 0.5 seconds to execute even when
// the list of bugs has not chnaged.
// therefore we use memoization method instead. For that install reselect pckg

// export const getUnresolvedBugsOld = (state) =>
// state.entities.bugs.filter((bug) => !bug.resolved);

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);
export const getBugByUserId = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((bug) => bug.userId == userId)
  );