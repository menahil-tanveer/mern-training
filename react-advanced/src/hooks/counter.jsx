import React, { useState } from "react";
import useDocumentTitle from "./useDocumentTitle";
const Counter = (props) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  /*
    useState is a new hook (a function in essence) introduced in react 16.8, it allows us to hook into state.
    the first element i.e. array[0] in useState(0) is this.state.count and
    second i.e. array[1] is this.setState()
    */
  useDocumentTitle(`${name} has clicked ${count} times`);
  return (
    <div>
      <React.Fragment>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <div>
          {name} has clicked {count} times
        </div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </React.Fragment>
    </div>
  );
};

export default Counter;
