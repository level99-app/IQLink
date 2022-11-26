import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AboutSection from "../components/AboutSection";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import Header from "../components/Header";
import PostsSection from "../components/PostsSection";
import SuggestionsSection from "../components/SuggestionsSection";
import TeamsSection from "../components/TeamsSection";
import Post from "../components/Post";
import { connect } from "react-redux";
import {
  selectFollowing,
  selectMain,
  selectProjects,
  selectTeams,
} from "../store/actions/MenuActions";
import default_picture from "../assets/defaultProfileImage.jpg";
import { MdInsertPhoto } from "react-icons/md";
import { useAuthContext } from "../hooks/useAuthContext";
import jwt from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProfilePage = (props) => {
  const { username } = useParams();
  const usernameString = username.toString();
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";
  const [postsData, setPostsData] = useState();
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userData, setUserData] = useState();
  const [userLoaded, setUserLoaded] = useState(false);

  const fetchUser = async () => {
    try {
      await axios
        .get(`${uri}/api/users/username/${usernameString}`)
        .then((res) => {
          console.log("fetch User from params: " + res.data);
          setUserData(res.data);
        })
        .then(() => setUserLoaded(true));
    } catch (error) {
      console.log("err: ", error);
    }
  };
  const [userId, setUserId] = useState("");

  const fetchPosts = async () => {
    try {
      await axios
        .get(`${uri}/api/posts/${userData._id}`)
        .then((res) => {
          console.log(res);
          setPostsData(res.data.reverse());
        })
        .then(() => setPostsLoaded(true));
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const [postContentText, setPostContentText] = useState("");

  useEffect(() => {
    console.log(username);
    fetchUser();
  }, []);

  const profilePictureStyle = userData
    ? userData.profile_image
    : default_picture;

  if (!userLoaded) {
    return (
      <div>
        <h1>Loading User</h1>
      </div>
    );
  } else {
    return (
      <div className="profile-page">
        <Header user={userData} />
        <div className="container">
          <div className="sections">
            <div className="wide-section">
              {props.menuState.selected === "main" ? (
                <div>
                  <AboutSection user={userData} />
                  <EducationSection user={userData} />
                  <ExperienceSection user={userData} />

                  <div className="posts">
                    {!postsLoaded ? (
                      <button onClick={() => fetchPosts()}>load posts</button>
                    ) : null}
                    {postsData
                      ? postsData.map((e) => {
                          return (
                            <Post data={e} user={userData ? true : false} />
                          );
                        })
                      : null}
                  </div>
                </div>
              ) : null}

              {props.menuState.selected === "teams" ? <TeamsSection /> : null}
            </div>
            <div className="side-section">
              <SuggestionsSection />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  console.log(state);
  return { menuState: state.menuState };
};

const mapActionsToProps = (dispatch) => {
  return {
    selectmain: () => dispatch(selectMain()),
    selectprojects: () => dispatch(selectProjects()),
    selectteams: () => dispatch(selectTeams()),
    selectfollowing: () => dispatch(selectFollowing()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ProfilePage);
