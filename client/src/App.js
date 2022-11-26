import logo from "./logo.svg";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { SiMessenger } from "react-icons/si";
import Messenger from "./components/Messenger";
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./pages/HomePage";
import {
  collapseMessenger,
  showMessenger,
} from "./store/actions/MessengerActions";
import { logIn, logOut } from "./store/actions/LoginActions";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import MessengerBox from "./components/MessengerBox";
import { hideModal, showModal } from "./store/actions/loginModelAction";
import SignInModal from "./components/SignInModal";
import SignInPage from "./pages/SignInPage";
import { useAuthContext } from "./hooks/useAuthContext";
import ProfilePageForeign from "./pages/ProfilePageForeign";
import NotFound from "./pages/NotFound";

function App(props) {
  const { user } = useAuthContext();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/user/:username" element={<ProfilePageForeign />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {user ? <Messenger /> : null}
        {user && !props.messengerBoxState.collapsed ? <MessengerBox /> : null}
        <Footer />
      </div>
      {props.loginModalState.shown ? <SignInModal /> : null}
    </Router>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    messengerState: state.messengerState,
    loginState: state.loginState,
    messengerBoxState: state.messengerBoxState,
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

export default connect(mapStateToProps, mapActionsToProps)(App);
