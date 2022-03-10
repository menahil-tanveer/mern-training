import React, { Component } from "react";
import userContext from "./userContext";
class MovieList extends Component {
  render() {
    return (
      <userContext.Consumer>
        {(userContext) => <div>movie list {userContext.name}</div>}
      </userContext.Consumer>
    );
  }
}

export default MovieList;
