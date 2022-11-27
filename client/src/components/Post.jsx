import React from "react";
import default_picture from "../assets/defaultProfileImage.jpg";
import mypicture from "../assets/mypicture.jpg";
import PostComment from "./PostComment";
import { useAuthContext } from "../hooks/useAuthContext";
import jwt from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";

const Post = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";

  const { user } = useAuthContext();

  const getTokenData = () => {
    return jwt(localStorage.getItem("token"));
  };

  const postOrigin = props.data.post_origin.toString();

  const handleDelete = async () => {
    console.log(postOrigin);
    try {
      await axios
        .delete(`${uri}/api/posts/delete/${props.data._id}`)
        .then(() => props.fetchPosts());
    } catch (error) {
      console.log(error);
    }
  };

  const profilePictureStyle =
    user && !props.local_user
      ? props.user.profile_image
      : props.local_user.profile_image;

  return (
    <div className="post">
      {!props.user && user ? (
        <div className="section-top">
          <button
            className="bg-danger text-light"
            onClick={() => handleDelete()}
          >
            remove
          </button>
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
            <h6 className=" my-0 py-0">
              {user && !props.user
                ? props.local_user.first_name + " " + props.local_user.last_name
                : props.user.first_name + " " + props.user.last_name}
            </h6>
            <h5 className="my-0 py-0">
              {user && !props.user ? props.local_user.title : props.user.title}
            </h5>
            <h5 className="my-0 py-0">
              {user && !props.user
                ? Date(props.local_user.createdAt)
                : Date(props.user.createdAt)}
            </h5>
          </div>
        </div>
      </div>
      <p className="post-text-content my-2" style={{ whiteSpace: "pre-wrap" }}>
        {props.data.post_content_text}
      </p>
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

      <div className="comments"></div>
      <button>Load more</button>
    </div>
  );
};

export default Post;
