import { createSlice } from "@reduxjs/toolkit";
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
