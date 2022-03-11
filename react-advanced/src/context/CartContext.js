import React, { Component } from "react";
const CartContext = React.createContext();
/**
 * this sets the name of the provider
 * it can be viewed in the console when looking at the component heirarchy
 */
CartContext.displayName = "CartContext";
export default CartContext;
