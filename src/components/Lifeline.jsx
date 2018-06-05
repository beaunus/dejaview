import React from "react";
//import "./Lifeline.css";

function Lifeline(props) {
  return (
    <div className="lifeline">
      {Object.keys(props.events)
        .sort((a, b) => b > a)
        .map((key, index) => {
          return (
            <div className="lifeline-item">
              <a href={props.events[key][0].link} key={index}>
                {props.events[key][0].title}
              </a>
            </div>
          );
        })}
    </div>
  );
}

export default Lifeline;
