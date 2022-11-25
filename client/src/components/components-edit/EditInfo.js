import React, { useState } from "react";
import { hideModal, showModal } from "../../store/actions/loginModelAction";
import { connect } from "react-redux";
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
    console.log(firstName, " ", lastName);

    try {
      await axios.patch(`${uri}/api/users/me/${id}}`, {
        id: id,
        first_name: firstName,
        last_name: lastName,
        city: city,
        country: country,
        state: state,
        title: title,
      });
    } catch (error) {
      console.log("got error: ", error);
    }
  };
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [country, setCountry] = useState(props.user.country);
  const [city, setCity] = useState(props.user.city);
  const [state, setState] = useState(props.user.state);
  const [title, setTitle] = useState(props.user.title);
  return (
    <div className="edit-info">
      <div className="edit-modal">
        <div className="modal-bg" onClick={() => props.onHideEditInfo()}></div>
        <div className="modal-content">
          <form>
            <label> first name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="set first name"
              value={firstName}
            />
            <label> last name</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="set last name"
              value={lastName}
            />
            <label> city</label>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              placeholder="set city"
              value={city}
            />
            <label> state</label>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              placeholder="set state"
              value={state}
            />
            <label> country </label>
            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              placeholder="set country"
              value={country}
            />
            <label> title </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="set title"
              value={title}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Update Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loginModalState: state.loginModalState,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    hidemodal: () => dispatch(hideModal()),
    showmodal: () => dispatch(showModal()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(EditInfo);
