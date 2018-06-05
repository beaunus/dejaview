import React from "react";
//import "./Lifeline.css";

function Lifeline(props) {
  return (
    <div className="lifeline">
      <p>From Lifeline</p>
      <p>{props.title}</p>
    </div>
  );
}

export default Lifeline;
