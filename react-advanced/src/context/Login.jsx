import React, { useContext } from "react";
import UserContext from "./UserContext";
function Login(props) {
  const userContext = useContext(UserContext);
  return (
    <div>
      <button onClick={() => userContext.onLoggedIn("username")}>login</button>
    </div>
  );
}

export default Login;
