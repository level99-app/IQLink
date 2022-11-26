import React from "react";

const Experience = (props) => {
  return (
    <div className="experience">
      <div className="experience-info">
        {props.data.is_working ? <h6>is working </h6> : <h6>Has worked at</h6>}
        <h3> {props.data.company_name}</h3>
        <h6> as {props.data.position} </h6>
        <h6>
          {" "}
          From {props.data.month_started}/{props.data.year_started} To{" "}
          {props.data.month_ended}/{props.data.year_ended}
        </h6>
      </div>
      <div>
        <p>{props.data.description}</p>
      </div>
    </div>
  );
};

export default Experience;
