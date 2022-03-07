import React, { Component } from "react";
class Header extends Component {
  state = {
    logo: "",
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse d-flex justify-content-between"
              id="navbarTogglerDemo01"
            >
              <div className="p-2">
                <a className="navbar-brand display-1" href="#">
                  LOGO...
                  {/* <img src={this.state.logo} alt="logo" /> */}
                </a>
              </div>
              <div>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Header;
