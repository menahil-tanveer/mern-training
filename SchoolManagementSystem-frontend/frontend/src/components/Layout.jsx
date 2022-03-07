import React, { Component } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

class BaseLayout extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Header />
        <Sidebar />
      </React.Fragment>
    );
  }
}

export default BaseLayout;
