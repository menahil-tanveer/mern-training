import React, { Component } from "react";
import Signup from "./Forms/Signup";
class BaseLayout extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Signup />
      </React.Fragment>
    );
  }
}

export default BaseLayout;
