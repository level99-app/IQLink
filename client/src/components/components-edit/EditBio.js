import React, { useState } from "react";
import jwt from "jwt-decode";
import axios from "axios";
const EditInfo = (props) => {
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
        bio: bio,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        city: props.user.city,
        country: props.user.country,
        state: props.user.state,
        title: props.user.title,
      });
    } catch (error) {
      console.log("got error: ", error);
    }
  };
  const [bio, setBio] = useState(props.user.bio);

  return (
    <div className="edit-info">
      <div className="edit-modal">
        <div className="modal-bg" onClick={() => props.onHideEditBio()}></div>
        <div className="modal-content">
          <form>
            <label> Bio </label>
            <textarea
              type="text"
              onChange={(e) => setBio(e.target.value)}
              placeholder="set title"
              value={bio}
            ></textarea>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Update Bio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
