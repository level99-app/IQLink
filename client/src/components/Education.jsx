import React from "react";

const Education = (props) => {
  return (
    <div className="education">
      <div className="education-info">
        {props.data.is_attending ? <h4>is attending </h4> : <h4>Graduated</h4>}
        <h4> {props.data.school_name} for</h4>
        <h3> {props.data.degree_earned}</h3>
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

export default Education;
