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
import UserContext from "./context/UserContext";
import CartContext from "./context/CartContext";
class App extends Component {
  handleLoggedIn = (username) => {
    console.log("getting user", username);
    const user = { name: "Menahil" };
    this.setState({ currentUser: user });
  };
  state = {
    currentUser: {
      name: null,
    },
  };
  render() {
    return (
      // This is how multiple contexts are implemented, now cart context will be available in
      // the child components of the app component
      //value is a default prop for provider, it will pass the context down the component tree
      <CartContext.Provider value={{ cart: ["element"] }}>
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.handleLoggedIn,
          }}
        >
          <div>
            <MoviePage />
          </div>
        </UserContext.Provider>
      </CartContext.Provider>
    );
  }
}

export default App;
