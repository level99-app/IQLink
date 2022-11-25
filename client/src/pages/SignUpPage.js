import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const SignUpPage = () => {
  const navigate = useNavigate();

  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iqlink.herokuapp.com"
      : "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordTwo === password && password.length > 6) {
      try {
        const data = await axios.post(`${uri}/api/users`, {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
        });
        navigate("/signin");
      } catch (error) {
        console.log("error at signuppage: ");
      }
    } else {
      setWrongPasswordMsg("shown");
    }
  };

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const style = passwordsMatch ? "pass-no-match" : "pass-match";

  const [wrongPasswordMsg, setWrongPasswordMsg] = useState("hidden");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const checkMatch = () => {
    if (password !== passwordTwo && password.length > 6) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <div className="sign-up-page">
      <div className="container">
        <form className="sign-up-form">
          <label>First name</label>
          <input
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            type="text"
            placeholder="Enter your first name"
          />
          <label>Last name</label>
          <input
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            type="text"
            placeholder="Enter your last name"
          />

          <label>Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Enter your email"
          />
          {wrongPasswordMsg === "shown" ? (
            <h5 style={{ color: "red" }}>Passwords don't match</h5>
          ) : null}
          <label>New password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkMatch();
              console.log(password, " ", passwordTwo);
            }}
            type="password"
            placeholder="Enter password"
          />
          <label>Enter password again</label>
          <input
            value={passwordTwo}
            onChange={(e) => {
              setPasswordTwo(e.target.value);
              checkMatch();
              console.log(password, " ", passwordTwo);
            }}
            type="password"
            placeholder="Enter password again"
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
