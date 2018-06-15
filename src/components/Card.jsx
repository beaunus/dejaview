import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";
import moment from "moment";

const Card = props => {
  const classNames = ["container"];
  if (props.isEven) {
    classNames.push("left");
  } else {
    classNames.push("right");
  }
  const events = Object.keys(props.events)
    .map(label => {
      if (props.labels[label]) {
        return props.events[label].map((event, eventIndex) => (
          <Event key={`${label}_${eventIndex}`} label={label} event={event} />
        ));
      }
      return null;
    })
    .filter(event => event);
  if (events.length > 0) {
    return (
      <div className={classNames.join(" ")}>
        <div className="content">
          <div className="pub-date">
            {moment(new Date(props.date)).format("MMMM D, YYYY")}
          </div>
          {Object.keys(props.events).map(label => {
            if (props.labels[label]) {
              return props.events[label].map((event, eventIndex) => (
                <Event
                  key={`${label}_${eventIndex}`}
                  label={label}
                  event={event}
                />
              ));
            }
            return null;
          })}
        </div>
      </div>
    );
  }
  return null;
};

Card.propTypes = {
  events: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  isEven: PropTypes.bool.isRequired,
  labels: PropTypes.object.isRequired
};

export default Card;
