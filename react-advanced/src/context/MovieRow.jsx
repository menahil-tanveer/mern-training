/**
 * This component describes the advantage of using functional component w.r.t context
 * using context is very simple in this case and removes unwanted complexity from the
 * component heirarchy e.g. those extra consumer components and a function as their child
 */
import React, { Component } from "react";
import { useContext } from "react";
import UserContext from "./UserContext";
import CartContext from "./CartContext";
const MovieRow = () => {
  const currentUser = useContext(UserContext);
  const cartContext = useContext(CartContext);
  console.log("context", currentUser);
  return (
    <div>
      Movie row: {currentUser.currentUser.name}:::: cart: {cartContext.cart}
    </div>
  );
};

export default MovieRow;
