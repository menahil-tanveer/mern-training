import {
  bugAdded,
  bugResolved,
  getUnresolvedBugs,
  getBugByUserId,
  bugAssigned,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { loadUsers } from "./store/users";
import configureStore from "./store/configureStore";
const store = configureStore();

// if written between dispatching actions, we will not be notified about the second action
// const unsubscribe = store.subscribe(() => {
//   console.log("store changed", store.getState());
// });
// add bug
// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(bugAdded({ description: "bug 1" }));
// store.dispatch(bugAdded({ description: "bug 2" }));
// store.dispatch(bugAdded({ description: "bug 3" }));
// dispatching an action inside an action
// store.dispatch(() => {
//   store.dispatch({
//     type: "bugsReceived",
//     bugs: ["sample 1", "sample 2", "sample 3"],
//   });
//   console.log(store.getState());
// });
// resolve
// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(userAdded({ name: "user 1" }));
// store.dispatch(userAdded({ name: "user 2" }));
// store.dispatch(bugAssigned({ bugId: 1, userId: 1 }));
// store.dispatch({
//   type: "error",
//   payload: {
//     message: "An error has occurred",
//   },
// });
console.log("store:", store);
console.log("state:", store.getState());
const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log("unresolvedBugs", unresolvedBugs);
const bugs = getBugByUserId(1)(store.getState());
console.log("Get bug by user id::", bugs);

// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "/users",
//     onSuccess: "usersAdded", // action that needs to be dispatched on success
//     onError: "apiRequestFailed", // action that needs to be dispatched on failure
//   },
// });
// store.dispatch(
//   actions.apiCallBegan({
//     onSuccess: "usersAdded", // action that needs to be dispatched on success
//     // onError: actions.apiCallFailed.type, // moving this to the middleware
//   })
// );
store.dispatch(loadUsers());
console.log("USERS STATE", store.getState());
