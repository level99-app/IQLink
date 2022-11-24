import React from "react";

const Experience = (props) => {
  return (
    <div className="experience">
      <div className="experience-info">
        {props.data.is_working ? <h4>is working </h4> : <h4>Has worked at</h4>}
        <h3> {props.data.company_name}</h3>
        <h4> as {props.data.position} </h4>
        <h4>
          {" "}
          From {props.data.month_started}/{props.data.year_started} To{" "}
          {props.data.month_ended}/{props.data.year_ended}
        </h4>
      </div>
      <div>
        <p>{props.data.description}</p>
      </div>
    </div>
  );
};

export default Experience;
