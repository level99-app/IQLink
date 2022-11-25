import React, { useState } from "react";
import jwt from "jwt-decode";
import axios from "axios";

const EditAbout = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";
  const id = jwt(localStorage.getItem("token")).id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${uri}/api/users/me/${id}}`, {
        id: id,
        about: about,
      });
    } catch (error) {
      console.log("got error: ", error);
    }
  };
  const [about, setAbout] = useState(props.user.about);

  return (
    <div className="edit-info">
      <div className="edit-modal">
        <div className="modal-bg" onClick={() => props.onHideEditAbout()}></div>
        <div className="modal-content">
          <form>
            <label> About </label>
            <textarea
              type="text"
              onChange={(e) => setAbout(e.target.value)}
              placeholder="talk about your profession, personality...etc. \n example: Optimstic and Enthusiastic Software Engineer with over 5 years of experience..."
              value={about}
            ></textarea>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Update About
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAbout;
