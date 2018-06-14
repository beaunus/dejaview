import React from "react";
import Card from "./Card";
import "../styles/Lifeline.css";
import moment from "moment";

const Lifeline = props => {
  return (
    <div className="lifeline">
      {Object.keys(props.events)
        .sort((a, b) => moment(new Date(b)) > moment(new Date(a)))
        .map((date, index) => (
          <Card
            events={props.events[date]}
            date={date}
            key={index}
            isEven={index % 2 === 0}
            labels={props.labels}
          />
        ))}
    </div>
  );
};

export default Lifeline;
