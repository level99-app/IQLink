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
import { logIn, logOut } from "../store/actions/LoginActions";
import EditAbout from "../components/components-edit/EditAbout";
const ProfilePage = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";
  const [postsData, setPostsData] = useState();
  const [postsLoaded, setPostsLoaded] = useState(false);

  const id = jwt(localStorage.getItem("token")).id;

  const fetchPosts = async () => {
    try {
      await axios
        .get(`${uri}/api/posts/${id}`)
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
  const publishPost = async () => {
    try {
      await axios
        .post(`${uri}/api/posts/`, {
          post_origin: id,
          post_content_text: postContentText,
        })
        .then(() => fetchPosts());
    } catch (error) {}
  };

  const { user } = useAuthContext();

  const profilePictureStyle = user ? default_picture : default_picture;
  return (
    <div className="profile-page">
      <Header />
      <div className="container">
        <div className="sections">
          <div className="wide-section">
            {props.menuState.selected === "main" ? (
              <div>
                <AboutSection />
                <EducationSection />
                <ExperienceSection />
                {user ? (
                  <div className="start-a-post">
                    <div className="start-a-post-top">
                      <div
                        style={{
                          backgroundImage: `url(${profilePictureStyle})`,
                        }}
                        className="start-a-post-profile-picture"
                      ></div>
                      <textarea
                        value={postContentText}
                        onChange={(e) => setPostContentText(e.target.value)}
                        placeholder="Write a post..."
                      ></textarea>
                    </div>

                    <div className="start-a-post-bottom">
                      <ul>
                        <li>
                          <MdInsertPhoto /> Photo
                        </li>
                        <li>
                          <MdInsertPhoto /> Video
                        </li>
                        <li>
                          <button
                            className="mx-1"
                            onClick={() => publishPost()}
                          >
                            post
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : null}
                <div className="posts">
                  {!postsLoaded ? (
                    <button onClick={() => fetchPosts()}>load posts</button>
                  ) : null}
                  {postsData
                    ? postsData.map((e) => {
                        return <Post data={e} />;
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
    login: () => dispatch(logIn()),
    logout: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ProfilePage);
