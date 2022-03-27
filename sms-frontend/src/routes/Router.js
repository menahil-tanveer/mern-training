/**
 * Author: Menahil
 * Date: 22-03-22
 * Purpose: This component contains all the routes of the app
 */
import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Home from "../views/Home";
import Signup from "../views/Signup";
import Login from "../views/Login";

class Router extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Home />}></Route>
            <Route path="/sign-up" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<h1>404</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Router;
