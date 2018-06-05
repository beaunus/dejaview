import React from "react";
//import "./Lifeline.css";

function Lifeline(props) {
  return (
    <div className="lifeline">
      <ul>
        {Object.keys(props.events)
          .sort((a, b) => b > a)
          .map((key, index) => {
            return (
              <li className="headline">
                <div>
                  <div key={index}>
                    <a href={props.events[key][0].link} key={index}>
                      {props.events[key][0].title}
                    </a>
                  </div>
                  <div key={index} className="pub-date">
                    {key}
                  </div>
                  {props.events[key][0].text}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Lifeline;
