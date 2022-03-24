import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    //actions => actions handlers
    userAdded: (state, action) => {
      state.push({
        id: state.length + 1,
        name: action.payload.name,
      });
    },
    usersAdded: (state, action) => {
      state.push(...action.payload);
      console.log("state!", state);
    },
  },
});

export const { userAdded, usersAdded } = slice.actions;
export default slice.reducer;
// CONFIG FILE CONSTANTS
// const URL = "/users";
// ACTION CREATORS
export const loadUsers = () =>
  apiCallBegan({
    onSuccess: usersAdded.type,
  });
