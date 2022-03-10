import React, { Component } from "react";
import withTooltip from "./withTooltip";

class movie extends Component {
  render() {
    return <div>Movie {this.props.showTooltip && <p>i'm a tooltip!</p>}</div>;
  }
}

export default withTooltip(movie);

// to use this component with higher order component enclose the component in that
// component in export statement
