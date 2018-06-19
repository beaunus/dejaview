import React from "react";
import PropTypes from "prop-types";
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
            date={date}
            events={props.events[date]}
            granularity={props.granularity}
            isEven={index % 2 === 0}
            key={index}
            labels={props.labels}
          />
        ))}
    </div>
  );
};

Lifeline.propTypes = {
  events: PropTypes.object.isRequired,
  granularity: PropTypes.string.isRequired,
  labels: PropTypes.object.isRequired
};

export default Lifeline;
