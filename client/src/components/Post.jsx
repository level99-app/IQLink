import React from "react";
import default_picture from "../assets/defaultProfileImage.jpg";
import mypicture from "../assets/mypicture.jpg";
import PostComment from "./PostComment";
import { useAuthContext } from "../hooks/useAuthContext";
import jwt from "jwt-decode";
const Post = (props) => {
  const { user } = useAuthContext();

  const getTokenData = () => {
    return jwt(localStorage.getItem("token"));
  };

  const profilePictureStyle = user ? default_picture : default_picture;
  return (
    <div className="post">
      {!props.user && user ? (
        <div className="section-top">
          <button className="bg-danger text-light">remove</button>
          <button className="bg-warning text-dark">edit</button>
        </div>
      ) : null}

      <div className="post-top">
        <div className="post-origin">
          <div
            id="post-profile-picture"
            style={{ backgroundImage: `url(${profilePictureStyle})` }}
          ></div>
          <div className="col text-start">
            <h5 className=" my-0 py-0">Omar Khalil</h5>
            <h5>Software Engineer | ENFJ 3w4</h5>
          </div>
        </div>
      </div>
      <p className="text-content">{props.data.post_content_text}</p>
      <div className="media-content">
        {props.img ? <img src={props.img} alt="post image" /> : null}
        {props.video ? <video src={props.video} /> : null}
      </div>
      {user ? (
        <div className="post-actions">
          <button>Like</button>
          <button>Share</button>
        </div>
      ) : null}
      {user ? (
        <div>
          <textarea placeholder="Type your comment..." />
          <button>post</button>
        </div>
      ) : null}

      <div className="comments">
        <PostComment />
      </div>
      <button>Load more</button>
    </div>
  );
};

export default Post;
