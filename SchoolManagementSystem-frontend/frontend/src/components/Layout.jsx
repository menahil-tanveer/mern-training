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
  // The entire app reloads (all components are rendered again)
  //  but only the virual dom is updated not the actual dom
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
