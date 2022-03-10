import React, { Component } from "react";
// NOTE: Lifecycle hooks can only be used in class components not stateless components
class BaseLayout extends Component {
  state = {};
  constructor(props) {
    super(props);
    console.log("BaseLayout - constructor");
    // undefined props obj
    console.log("props BaseLayout", props);
  }
  // perfect place for making ajax calls
  componentDidMount() {
    // i.e. component is in the DOM
    console.log("BaseLayout -  mounted");
  }
  componentDidUpdate() {
    // when props or state is updated
    console.log("BaseLayout -  updated");
  }
  render() {
    console.log("BaseLayout rendered");
    return <React.Fragment></React.Fragment>;
  }
}

export default BaseLayout;
