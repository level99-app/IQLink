import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emptyData, setData } from "../store/actions/UserActions";
import { connect } from "react-redux";
import { useAuthContext } from "../hooks/useAuthContext";

const SignInPage = (props) => {
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
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sign-in-page">
      <h3 className="my-5">Sign In</h3>
      <div className="container">
        <form className="sign-up-form">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email"
          />
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { userState: state.userState };
};

const mapActionsToProps = (dispatch) => {
  return {
    setData: () => dispatch(setData()),
    emptyData: () => dispatch(emptyData()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SignInPage);
