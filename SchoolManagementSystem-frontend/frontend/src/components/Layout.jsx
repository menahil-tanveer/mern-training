import React, { Component } from "react";
import Login from "./Forms/Login";
class BaseLayout extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Login />
      </React.Fragment>
    );
  }
}

export default BaseLayout;
