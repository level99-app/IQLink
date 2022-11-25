import React, { useState } from "react";
import axios from "axios";

const EditExperience = (props) => {
  const uri =
    process.env.NODE_ENV == "production"
      ? "https://iqlink.herokuapp.com"
      : "http://localhost:5000";
  const [experienceId, setExperienceId] = useState();
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [monthStarted, setMonthStarted] = useState(1);
  const [yearStarted, setYearStarted] = useState(2010);
  const [monthEnded, setMonthEnded] = useState(1);
  const [yearEnded, setYearEnded] = useState(2010);
  const [working, setWorking] = useState(false);
  const [description, setDescription] = useState("");
  const postExperience = async (e) => {
    e.preventDefault();
    try {
      const experienceData = {
        experience_holder: props.userId,
        position: position,
        company_name: companyName,
        month_started: monthStarted,
        year_started: yearStarted,
        month_ended: monthEnded,
        year_ended: yearEnded,
        is_working: working,
        description: description,
      };
      await axios.post(`${uri}/api/experiences/`, experienceData).then((r) => {
        setShowNewExperience(false);
        console.log(r);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateExperience = async (e) => {
    e.preventDefault();
    try {
      const experienceData = {
        position: position,
        company_name: companyName,
        month_started: monthStarted,
        year_started: yearStarted,
        month_ended: monthEnded,
        year_ended: yearEnded,
        is_working: working,
        description: description,
      };
      await axios
        .patch(`${uri}/api/experiences/${experienceId}`, experienceData)
        .then((r) => {
          setShowNewExperience(false);
          console.log(r);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExperience = async (id) => {
    try {
      await axios.delete(`${uri}/api/experiences/${id}`).then((r) => {
        setShowNewExperience(false);
        console.log(r);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [showNewExperience, setShowNewExperience] = useState(false);

  return (
    <div className="edit-info">
      <div className="edit-modal">
        <div
          className="modal-bg"
          onClick={() => props.onHideEditExperience()}
        ></div>
        <div className="modal-content">
          <button onClick={() => setShowNewExperience(true)}>
            new experience
          </button>
          {showNewExperience ? (
            <div className="new-edit-content">
              <label>Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter Company Name"
              />
              <label>Position</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter Position"
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
              <label>Are you still working here?</label>
              <select onChange={(e) => setWorking(e.target.value)}>
                <option value={true}>
                  Yes, I am still working at this company
                </option>
                <option value={false}>
                  No, I am not working at this company anymore
                </option>
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
                  onClick={(e) => postExperience(e)}
                  type="submit"
                  className="bg-success my-2 mx-2"
                >
                  Add New Experience
                </button>
                <button
                  onClick={(e) => updateExperience(e)}
                  type="submit"
                  className="bg-secondary my-2 mx-2"
                >
                  Update Experience
                </button>
              </div>
            </div>
          ) : null}
          {props.experiencesList.map((e) => (
            <div className="experience">
              <div className="experience-info">
                <button
                  className="bg-info mx-2"
                  onClick={() => {
                    setShowNewExperience(true);
                    setExperienceId(e._id);
                    setCompanyName(e.company_name);
                    setPosition(e.position);
                    setMonthStarted(e.month_started);
                    setYearStarted(e.year_started);
                    setMonthEnded(e.month_ended);
                    setYearEnded(e.year_ended);
                    setWorking(e.is_working);
                    setDescription(e.descirption);
                  }}
                >
                  edit
                </button>
                <button
                  className="bg-danger mx-2"
                  onClick={() => {
                    deleteExperience(e._id);
                  }}
                >
                  delete
                </button>
                {e.is_working ? <h4>is working </h4> : <h4>Has wirjed at</h4>}
                <h3> {e.company_name}</h3>
                <h4> as {e.position} </h4>
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

export default EditExperience;
