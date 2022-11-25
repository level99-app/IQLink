import React, { useState } from "react";
import jwt from "jwt-decode";
import axios from "axios";
const EditProfilePicture = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";
  const id = jwt(localStorage.getItem("token")).id;

  const [newProfileImage, setNewProfileImage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${uri}/api/users/me/${id}}`, {
        id: id,
        profile_image: newProfileImage,
      });
    } catch (error) {
      console.log("got error: ", error);
    }
  };

  const [profileImage, setProfileImage] = useState("");

  const uploadImage = (e) => {
    e.preventDefault();
    console.log(profileImage);
    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", "iqlink");

    axios
      .post("https://api.cloudinary.com/v1_1/Copyres//image/upload", formData)
      .then((res) => setNewProfileImage(res.data.url));
  };

  const bgImage = profileImage ? URL.createObjectURL(profileImage) : null;

  return (
    <div className="edit-info">
      <div className="edit-modal">
        <div
          className="modal-bg"
          onClick={() => props.onHideEditProfilePicture()}
        ></div>
        <div className="modal-content">
          <form>
            <label> Profile Picture </label>
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <div
              className="profile-image-viewer"
              style={{
                backgroundImage: `url(${bgImage})`,
              }}
            ></div>
            <button type="submit" onClick={(e) => uploadImage(e)}>
              Upload Picture
            </button>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Update Picture
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePicture;
