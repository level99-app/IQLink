import React, { useState, useEffect } from "react";
import Experience from "./Experience";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import jwt from "jwt-decode";
import EditExperience from "./components-edit/EditExperience";

const ExperienceSection = () => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iqlink.herokuapp.com"
      : "http://localhost:5000";

  const [showEditExperience, setShowEditExperience] = useState(false);

  const onHideEditExperience = () => {
    setShowEditExperience(false);
  };

  const id = jwt(localStorage.getItem("token")).id;

  const [experiences, setExperiences] = useState([]);
  const fetchExperiences = async () => {
    try {
      await axios
        .get(`${uri}/api/experiences/${id}`)
        .then((res) => setExperiences(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const { user } = useAuthContext();

  return (
    <div className="experience-section">
      <h3 className="section-title">
        Experience{" "}
        {user ? (
          <button
            style={{ fontSize: "16px", float: "right" }}
            onClick={() => setShowEditExperience(true)}
          >
            edit
          </button>
        ) : null}
      </h3>

      {showEditExperience ? (
        <EditExperience
          userId={jwt(localStorage.getItem("token")).id}
          experiencesList={experiences}
          onHideEditExperience={onHideEditExperience}
        />
      ) : null}

      <div className="educations">
        {experiences.map((e) => (
          <Experience data={e} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
