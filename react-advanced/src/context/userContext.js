import React, { Component } from "react";
const UserContext = React.createContext();
/**
 * this sets the name of the provider
 * it can be viewed in the console when looking at the component heirarchy
 */
UserContext.displayName = "UserContext";
export default UserContext;
