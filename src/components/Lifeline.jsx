import React from "react";
//import "./Lifeline.css";

function Lifeline(props) {
  return (
    <div className="lifeline">
      <p>From Lifeline</p>
      {Object.keys(props.events)
        .sort((a, b) => b > a)
        .map((key, index) => {
          return <div key={index}>{props.events[key][0].title}</div>;
        })}
    </div>
  );
}

export default Lifeline;
