import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import EditAbout from "./components-edit/EditAbout";
import axios from "axios";
import jwt from "jwt-decode";

const AboutSection = () => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iqlink.herokuapp.com"
      : "http://localhost:5000";
  const [collapsed, setCollapsed] = useState(true);

  const style = collapsed ? { height: "200px" } : { height: "fit-content" };

  const { user } = useAuthContext();

  const [userData, setUserData] = useState({});
  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `${uri}/api/users/me/${jwt(localStorage.getItem("token")).id}`
      );
      console.log(res);
      setUserData(res.data);
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
          <h4 className="section-title">
            About
            {user ? (
              <button
                className="bg-warning text-dark"
                style={{ fontSize: "16px", float: "right" }}
                onClick={() => setShowEditAbout(true)}
              >
                Edit
              </button>
            ) : null}
          </h4>
          <h5
            style={{ cursor: "pointer" }}
            onClick={() => setCollapsed(!collapsed)}
          >
            See More
          </h5>
          <p>{userData.about}</p>
        </div>{" "}
      </div>

      {showEditAbout ? (
        <EditAbout onHideEditAbout={onHideEditAbout} user={userData} />
      ) : null}
    </div>
  );
};

export default AboutSection;
