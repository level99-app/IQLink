import React, { useState, useEffect } from "react";
import Education from "./Education";
import EditEducation from "./components-edit/EditEducation";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import jwt from "jwt-decode";

const EducationSection = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iqlink.herokuapp.com"
      : "http://localhost:5000";

  const [showEditEducation, setShowEditEducation] = useState(false);

  const onHideEditEducation = () => {
    setShowEditEducation(false);
  };

  const id = jwt(localStorage.getItem("token")).id;

  const [educations, setEducations] = useState([]);
  const fetchEducations = async () => {
    try {
      await axios
        .get(`${uri}/api/educations/${id}`)
        .then((res) => setEducations(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const { user } = useAuthContext();

  return (
    <div className="education-section">
      <h3 className="section-title" style={{ float: "left" }}>
        Education
        {user ? (
          <button
            style={{ fontSize: "16px", float: "right" }}
            onClick={() => setShowEditEducation(true)}
          >
            Edit
          </button>
        ) : null}
      </h3>
      {showEditEducation ? (
        <EditEducation
          userId={jwt(localStorage.getItem("token")).id}
          educationsList={educations}
          onHideEditEducation={onHideEditEducation}
        />
      ) : null}
      <div className="educations">
        {educations.map((e) => (
          <Education data={e} />
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
