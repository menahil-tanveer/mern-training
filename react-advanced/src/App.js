// import "./App.css";
// import Counter from "./hooks/counter";
// import Users from "./components/Users";

// function App() {
// return <Counter id={1} />;
// return <Users />;
// }

// export default App;

/**
 * note: if a new prop is passed over here like this. The movie component won't be
 * able to recognize it
 * a simple fix to this issue is to go the higher order component (withTooltip) component and use
 * {...this.props} in order to access all the props passed down to the component
 */
import MoviePage from "./context/MoviePage";
import React, { Component } from "react";
import userContext from "./context/userContext";
class App extends Component {
  state = {
    currentUser: { name: "Mi" },
  };
  render() {
    return (
      <userContext.Provider value={this.state.currentUser.name}>
        <MoviePage />
      </userContext.Provider>
    );
  }
}

export default App;
