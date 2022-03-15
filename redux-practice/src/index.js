import { bugAdded, bugResolved } from "./store/bugs";
import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";
const store = configureStore();
// if written between dispatching actions, we will not be notified about the second action
// const unsubscribe = store.subscribe(() => {
//   console.log("store changed", store.getState());
// });
// add bug
store.dispatch(bugAdded({ description: "bug 1" }));
store.dispatch(bugAdded({ description: "bug 2" }));
store.dispatch(bugAdded({ description: "bug 3" }));
// resolve
store.dispatch(bugResolved({ id: 1 }));
console.log("store:", store);
console.log("state:", store.getState());
// store.dispatch(
//   actions.apiCallBegan({
//     url: "/bugs",
//     onSucces: "bugsReceived",
//   })
// );
