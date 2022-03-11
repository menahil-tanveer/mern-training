import React, { Component } from "react";
import Login from "./Login";
import MovieList from "./MovieList";
class MoviePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <MovieList />
        <Login />
      </div>
    );
  }
}

export default MoviePage;
