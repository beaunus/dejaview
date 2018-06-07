import React from "react";
import "../styles/Lifeline.css";
import moment from "moment";

function Lifeline(props) {
  return (
    <div className="lifeline">
      <ul>
        {Object.keys(props.events)
          .sort((a, b) => moment(new Date(b)) > moment(new Date(a))
          .map((key, index) => {
            return (
              <li key={"li_" + index}>
                <div className="lifeline scale-in-center">
                  <div className="headline" key={"div_" + index}>
                    <a href={props.events[key][0].link} key={index}>
                      {props.events[key][0].title}
                    </a>
                  </div>
                  <div key={index} className="pub-date">
                    {moment(new Date(key)).format("MMMM D, YYYY")}
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
