import { bugAdded, bugResolved, errorOccurred } from "./actions";
import store from "./store";
// if written between dispatching actions, we will not be notified about the second action
// const unsubscribe = store.subscribe(() => {
//   console.log("store changed", store.getState());
// });
// add bug
store.dispatch(bugAdded("bug 2"));
// resolve
store.dispatch(bugResolved(0));
console.log("store:::", store);
console.log("state:::", store.getState());
