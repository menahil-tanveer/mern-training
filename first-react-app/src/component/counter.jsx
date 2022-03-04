import React, { Component } from "react";
class Counter extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1 className="display-1">Hello world!</h1>{" "}
        <button className="btn  btn-primary m-1">Click me!</button>
      </div>
    );
  }
}

export default Counter;
