import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn, logOut } from "../store/actions/LoginActions";
import { connect } from "react-redux";
import logo from "../assets/iraqilink.png";
import { hideModal, showModal } from "../store/actions/loginModelAction";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = (props) => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-bs-controls="navbarTogglerDemo03"
          aria-bs-expanded="false"
          aria-bs-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          <div
            style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "cover",
              width: "34px",
              height: "34px",
            }}
          ></div>
        </Link>
        <input id="nav-searchbar" type="text" placeholder="Search IQLink" />
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teams">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/training">
                Training
              </Link>
            </li>
          </ul>
          <ul id="right-nav" className="navbar-nav mr-auto mt-2 mt-lg-0">
            {user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/signup">
                  <button id="nav-login-button">Sign Up</button>
                </Link>
              </li>
            )}

            {user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  id="nav-login-button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                  onClick={() => props.showmodal()}
                >
                  Sign In
                </button>
              </li>
            )}
            {user ? (
              <li className="nav-item">
                <button id="nav-login-button" onClick={() => logout()}>
                  Sign Out
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    messengerState: state.messengerState,
    loginState: state.loginState,
    loginModalState: state.loginModalState,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    login: () => dispatch(logIn()),
    logout: () => dispatch(logOut()),
    hidemodal: () => dispatch(hideModal()),
    showmodal: () => dispatch(showModal()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
