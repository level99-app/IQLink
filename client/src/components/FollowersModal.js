import React, { useState } from "react";
import { logOut } from "../store/actions/LoginActions";
import { logIn } from "../store/actions/LoginActions";
import { hideModal, showModal } from "../store/actions/loginModelAction";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const SignInModal = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${uri}/api/users/login`,
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          dispatch({ type: "LOGIN", payload: res.data.token });
        })
        .then(() => {
          navigate("/");
          props.hidemodal();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sign-in-modal">
      <div className="sign-in-modal-bg" onClick={() => props.hidemodal()}></div>
      <div className="modal-area">
        <form>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email or username"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Sign in
          </button>
          <Link to="/reset-password">
            <h6>forgot my password</h6>
          </Link>
        </form>
      </div>
    </div>
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

export default connect(mapStateToProps, mapActionsToProps)(SignInModal);
