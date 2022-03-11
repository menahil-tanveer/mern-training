import React, { Component } from "react";
import MovieRow from "./MovieRow";
import UserContext from "./UserContext";
class MovieList extends Component {
  // #
  static contextType = UserContext; //means we're setting static property of this class
  render() {
    return (
      // consumer tag expects a function to be its child so we write it as:
      <UserContext.Consumer>
        {(UserContext) => (
          <div>
            movie list {UserContext.currentUser.name}
            <MovieRow />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
/**
 * this could also be done inside the class using static keyword, either way is fine
 *  like this #
 */
MovieList.contextType = UserContext;
export default MovieList;
