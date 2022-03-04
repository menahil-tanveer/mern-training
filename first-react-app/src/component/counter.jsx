import React, { Component } from "react";
class Counter extends Component {
  state = {
    counter: 0,
  };
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    alert("Yay! /(^_^)/ ");
  }
  render() {
    return (
      <div>
        <h1 className="display-1">Hello world!</h1>{" "}
        <button onClick={this.handleClick} className="btn  btn-primary m-1">
          Click me!
        </button>
      </div>
    );
  }
}

export default Counter;
