import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EditAbout from "./components-edit/EditAbout";
import axios from "axios";
import jwt from "jwt-decode";

const AboutSection = (props) => {
  const uri =
    process.env.NODE_ENV === "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";
  const [collapsed, setCollapsed] = useState(true);

  const style = collapsed ? { height: "200px" } : { height: "fit-content" };

  const { user } = useAuthContext();

  const id = props.user
    ? props.user._id
    : jwt(localStorage.getItem("token")).id;

  const [userData, setUserData] = useState({});
  const fetchUserData = async () => {
    try {
      if (props.user) {
        const res = await axios.get(`${uri}/api/users/${id}`);
        console.log(res);
        setUserData(res.data);
      } else {
        const res = await axios.get(`${uri}/api/users/me/${id}`);
        console.log(res);
        setUserData(res.data);
      }
    } catch (error) {
      console.log("fetchusererror", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [showEditAbout, setShowEditAbout] = useState(false);

  const onHideEditAbout = () => {
    setShowEditAbout(false);
  };
  return (
    <div className="about-section">
      <div className="container">
        <div className="about-collapsable" style={style}>
          <div className="section-top">
            <h4 className="section-title">About</h4>
            {user && !props.user ? (
              <button
                className="bg-warning text-dark"
                style={{ fontSize: "16px", float: "right" }}
                onClick={() => setShowEditAbout(true)}
              >
                Edit
              </button>
            ) : null}
          </div>
          <p style={{ whiteSpace: "pre-wrap" }}>{userData.about}</p>
        </div>{" "}
        <div className="section-bottom">
          <button
            style={{ cursor: "pointer" }}
            onClick={() => setCollapsed(!collapsed)}
          >
            see more
          </button>
        </div>
      </div>

      {showEditAbout ? (
        <EditAbout
          fetchUserData={fetchUserData}
          onHideEditAbout={onHideEditAbout}
          user={userData}
        />
      ) : null}
    </div>
  );
};

export default AboutSection;
