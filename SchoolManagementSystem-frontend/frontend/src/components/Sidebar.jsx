import React, { Component } from "react";
class Sidebar extends Component {
  state = {
    divStyle: {
      color: "danger",
    },
  };
  parentDivStyles = {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  };
  sidebarStyles = {
    width: "220px",
    height: "100%",
  };
  mainStyles = {
    width: "calc(100vw - 220px)",
    height: "100%",
  };
  render() {
    return (
      <React.Fragment>
        <div style={this.parentDivStyles} className="d-flex bg-">
          <div style={this.sidebarStyles} className="bg-light">
            <ul className="nav flex-column d-flex">
              <li className="nav-item p-2 mt-2">
                <a className="nav-link active" aria-current="page" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item p-2">
                <a className="nav-link" href="#">
                  Users
                </a>
              </li>
              <li className="nav-item p-2">
                <a className="nav-link" href="#">
                  Courses
                </a>
              </li>
              <li className="nav-item p-2">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
          </div>
          <div style={this.mainStyles} className="p-5">
            main div
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;
