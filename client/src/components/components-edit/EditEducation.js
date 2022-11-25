import React, { useState } from "react";
import axios from "axios";

const EditEducation = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iraqilink.herokuapp.com"
      : "http://localhost:5000";
  const [educationId, setEducationId] = useState();
  const [schoolName, setSchoolName] = useState("");
  const [degreePursued, setDegreePursued] = useState("");
  const [monthStarted, setMonthStarted] = useState(1);
  const [yearStarted, setYearStarted] = useState(2010);
  const [monthEnded, setMonthEnded] = useState(1);
  const [yearEnded, setYearEnded] = useState(2010);
  const [attending, setAttending] = useState(true);
  const [description, setDescription] = useState("");
  const postEducation = async (e) => {
    e.preventDefault();
    try {
      const educationData = {
        education_holder: props.userId,
        degree_earned: degreePursued,
        school_name: schoolName,
        month_started: monthStarted,
        year_started: yearStarted,
        month_ended: monthEnded,
        year_ended: yearEnded,
        is_attending: attending,
        description: description,
      };
      await axios.post(`${uri}/api/educations/`, educationData).then((r) => {
        setShowNewEducation(false);
        console.log(r);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateEducation = async (e) => {
    e.preventDefault();
    try {
      const educationData = {
        degree_earned: degreePursued,
        school_name: schoolName,
        month_started: monthStarted,
        year_started: yearStarted,
        month_ended: monthEnded,
        year_ended: yearEnded,
        is_attending: attending,
        description: description,
      };
      await axios
        .patch(`${uri}/api/educations/${educationId}`, educationData)
        .then((r) => {
          setShowNewEducation(false);
          console.log(r);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEducation = async (id) => {
    try {
      await axios.delete(`${uri}/api/educations/${id}`).then((r) => {
        setShowNewEducation(false);
        console.log(r);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [showNewEducation, setShowNewEducation] = useState(false);

  return (
    <div className="edit-info">
      <div className="edit-modal">
        <div
          className="modal-bg"
          onClick={() => props.onHideEditEducation()}
        ></div>
        <div className="modal-content">
          <button onClick={() => setShowNewEducation(true)}>
            new education
          </button>
          {showNewEducation ? (
            <div className="new-edit-content">
              <label>School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter School Name"
              />
              <label>Degree Pursued</label>
              <input
                type="text"
                value={degreePursued}
                onChange={(e) => setDegreePursued(e.target.value)}
                placeholder="Enter Degree Pursued"
              />
              <label>Month Started</label>
              <input
                type="number"
                max={12}
                min={1}
                value={monthStarted}
                onChange={(e) => setMonthStarted(e.target.value)}
                placeholder="Enter Month Started"
              />
              <label>Year Started</label>
              <input
                type="number"
                max={2022}
                min={1920}
                value={yearStarted}
                onChange={(e) => setYearStarted(e.target.value)}
                placeholder="Enter Year Started"
              />
              <label>Month Ended</label>
              <input
                type="number"
                max={12}
                min={1}
                value={monthEnded}
                onChange={(e) => setMonthEnded(e.target.value)}
                placeholder="Enter Month Ended (optional)"
              />
              <label>Year Ended</label>
              <input
                type="number"
                value={yearEnded}
                onChange={(e) => setYearEnded(e.target.value)}
                placeholder="Enter Year Ended (optional)"
              />
              <label>Are you still attending?</label>
              <select onChange={(e) => setAttending(e.target.value)}>
                <option value={true}>Yes, I am still attending</option>
                <option value={false}>No, I have graduated</option>
              </select>
              <label>Description</label>
              <textarea
                value={description}
                maxLength={300}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
              />
              <div className="d-flex justify-content-evenly">
                <button
                  onClick={(e) => postEducation(e)}
                  type="submit"
                  className="bg-success my-2 mx-2"
                >
                  Add New Education
                </button>
                <button
                  onClick={(e) => updateEducation(e)}
                  type="submit"
                  className="bg-secondary my-2 mx-2"
                >
                  Update Education
                </button>
              </div>
            </div>
          ) : null}
          {props.educationsList.map((e) => (
            <div className="education">
              <div className="education-info">
                <button
                  className="bg-info mx-2"
                  onClick={() => {
                    setShowNewEducation(true);
                    setEducationId(e._id);
                    setSchoolName(e.school_name);
                    setDegreePursued(e.degree_earned);
                    setMonthStarted(e.month_started);
                    setYearStarted(e.year_started);
                    setMonthEnded(e.month_ended);
                    setYearEnded(e.year_ended);
                    setAttending(e.is_attending);
                    setDescription(e.descirption);
                  }}
                >
                  edit
                </button>
                <button
                  className="bg-danger mx-2"
                  onClick={() => {
                    deleteEducation(e._id);
                  }}
                >
                  delete
                </button>
                {e.is_attending ? <h4>is attending </h4> : <h4>Graduated</h4>}
                <h3> {e.degree_earned}</h3>
                <h4> {e.school_name} </h4>
                <h4>
                  {" "}
                  From {e.month_started}/{e.year_started} To {e.month_ended}/
                  {e.year_ended}
                </h4>
              </div>
              <div>
                <p>{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditEducation;
