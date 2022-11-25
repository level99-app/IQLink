import React, { useState } from "react";
import jwt from "jwt-decode";
import axios from "axios";
const EditProfilePicture = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";
  const id = jwt(localStorage.getItem("token")).id;

  const [newCoverImage, setNewCoverImage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${uri}/api/users/me/${id}}`, {
        id: id,
        banner_image: newCoverImage,
      });
    } catch (error) {
      console.log("got error: ", error);
    }
  };

  const [coverImage, setCoverImage] = useState("");

  const uploadImage = (e) => {
    e.preventDefault();
    console.log(coverImage);
    const formData = new FormData();
    formData.append("file", coverImage);
    formData.append("upload_preset", "iqlink");

    axios
      .post("https://api.cloudinary.com/v1_1/Copyres//image/upload", formData)
      .then((res) => setNewCoverImage(res.data.url));
  };

  const bgImage = coverImage ? URL.createObjectURL(coverImage) : null;

  return (
    <div className="edit-info">
      <div className="edit-modal">
        <div
          className="modal-bg"
          onClick={() => props.onHideEditCoverPicture()}
        ></div>
        <div className="modal-content">
          <form>
            <label> Cover Image </label>
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
            <div
              className="cover-image-viewer"
              style={{
                backgroundImage: `url(${bgImage})`,
              }}
            ></div>
            <button type="submit" onClick={(e) => uploadImage(e)}>
              Upload Image
            </button>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Update Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePicture;
