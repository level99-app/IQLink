import React, { useEffect, useState } from "react";
import doha from "../assets/dohaskyline.jpg";
import default_picture from "../assets/defaultProfileImage.jpg";
import { connect } from "react-redux";
import {
  selectFollowing,
  selectMain,
  selectProjects,
  selectTeams,
} from "../store/actions/MenuActions";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import jwt from "jwt-decode";
import EditInfo from "./components-edit/EditInfo";
import EditBio from "./components-edit/EditBio";
import EditProfilePicture from "./components-edit/EditProfilePicture";
import EditCoverPicture from "./components-edit/EditCoverPicture";
const Header = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";
  useEffect(() => {
    console.log(props.data);
  }, []);

  const [loading, setLoading] = useState(true);

  const { user } = useAuthContext();

  const [userData, setUserData] = useState({});
  const id = props.user
    ? props.user._id
    : jwt(localStorage.getItem("token")).id;
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${uri}/api/users/me/${id}`);
      console.log(res);
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.log("fetchusererror", error);
    }
  };

  const profilePictureStyle =
    userData.profile_image !== "" ? userData.profile_image : default_picture;
  const coverPictureStyle =
    userData.banner_image !== "" ? userData.banner_image : default_picture;

  useEffect(() => {
    fetchUserData();
  }, []);

  const [showEditInfo, setShowEditInfo] = useState(false);

  const onHideEditInfo = () => {
    setShowEditInfo(false);
  };

  const [showEditBio, setShowEditBio] = useState(false);

  const onHideEditBio = () => {
    setShowEditBio(false);
  };

  const [showEditProfilePicture, setShowEditProfilePicture] = useState(false);

  const onHideEditProfilePicture = () => {
    setShowEditProfilePicture(false);
  };

  const [showEditCoverPicture, setShowEditCoverPicture] = useState(false);

  const onHideEditCoverPicture = () => {
    setShowEditCoverPicture(false);
  };

  if (loading) {
    return (
      <div>
        {" "}
        <h1>Loading</h1>
      </div>
    );
  } else {
    return (
      <header className="profile-header">
        <div className="header-info">
          <div className="container">
            <div
              className="header-banner"
              style={{ backgroundImage: `url(${coverPictureStyle})` }}
            >
              {user && !props.user ? (
                <button
                  className="bg-primary text-light"
                  onClick={() => setShowEditCoverPicture(true)}
                >
                  Edit Cover
                </button>
              ) : null}
            </div>
            <div className="main-info">
              <div className="left-side">
                <div
                  className="profile-picture"
                  style={{ backgroundImage: `url(${profilePictureStyle})` }}
                ></div>
                {user && !props.user ? (
                  <button
                    className="bg-primary text-light"
                    onClick={() => setShowEditProfilePicture(true)}
                  >
                    Change Photo
                  </button>
                ) : null}
                <h1>
                  {user && !props.user
                    ? userData.first_name + " " + userData.last_name
                    : null}{" "}
                  {props.user
                    ? props.user.first_name + " " + props.user.last_name
                    : null}{" "}
                </h1>
                <h3 className="text-muted">
                  {user && !props.user ? userData.title : null}{" "}
                  {props.user ? props.user.title : null}
                </h3>
                <h5 className="text-muted">
                  {userData.city +
                    " " +
                    userData.state +
                    " " +
                    userData.country}
                </h5>
                <h5 className="text-primary">
                  {user && !props.user ? userData.email : null}
                  {props.user ? props.user.email : null}
                </h5>
                <div className="main-info-buttons">
                  {user && !props.user ? (
                    <button
                      className="bg-primary text-light"
                      onClick={() => setShowEditInfo(true)}
                    >
                      Edit Info
                    </button>
                  ) : null}

                  <button>Message</button>
                  <button>follow</button>
                </div>
              </div>
              <div className="bio">
                {user && !props.user ? (
                  <button
                    className="bg-primary text-light"
                    onClick={() => setShowEditBio(true)}
                  >
                    Edit Bio
                  </button>
                ) : null}
                <p>{user && !props.user ? userData.bio : props.user.bio}</p>
              </div>
            </div>{" "}
            <div className="header-nav">
              <ul>
                <li
                  onClick={() => props.selectmain()}
                  className="header-nav-item"
                >
                  Main
                </li>
                <li
                  onClick={() => props.selectprojects()}
                  className="header-nav-item"
                >
                  Projects
                </li>
                <li
                  onClick={() => props.selectteams()}
                  className="header-nav-item"
                >
                  Teams
                </li>
                <li
                  onClick={() => props.selectfollowing()}
                  className="header-nav-item"
                >
                  Following
                </li>
              </ul>
            </div>
          </div>
        </div>

        {showEditInfo ? (
          <EditInfo onHideEditInfo={onHideEditInfo} user={userData} />
        ) : null}
        {showEditBio ? (
          <EditBio onHideEditBio={onHideEditBio} user={userData} />
        ) : null}
        {showEditProfilePicture ? (
          <EditProfilePicture
            onHideEditProfilePicture={onHideEditProfilePicture}
            user={userData}
          />
        ) : null}
        {showEditCoverPicture ? (
          <EditCoverPicture
            onHideEditCoverPicture={onHideEditCoverPicture}
            user={userData}
          />
        ) : null}
      </header>
    );
  }
};
const mapStateToProps = (state) => {
  console.log(state);
  return { menuState: state.menuState, loginState: state.loginState };
};

const mapActionsToProps = (dispatch) => {
  return {
    selectmain: () => dispatch(selectMain()),
    selectprojects: () => dispatch(selectProjects()),
    selectteams: () => dispatch(selectTeams()),
    selectfollowing: () => dispatch(selectFollowing()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
