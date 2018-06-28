import React from "react";
import PropTypes from "prop-types";
import Event from "./Event";
import moment from "moment";

const Card = props => {
  const classNames = ["container"];
  const events = Object.keys(props.events)
    .map(label => {
      if (props.labels[label]) {
        return props.events[label].map((event, eventIndex) => (
          <Event
            event={event}
            granularity={props.granularity}
            key={`${label}_${eventIndex}`}
            label={label}
          />
        ));
      }
      return null;
    })
    .filter(event => event);
  if (events.length > 0) {
    let cardHeading;
    const dateMoment = moment(props.date);
    const fromNow = dateMoment.fromNow();
    switch (props.granularity) {
      case "week":
        cardHeading = `Week of ${dateMoment.format("LL")} - ${dateMoment
          .add(6, "days")
          .format("LL")}, ${fromNow}`;
        break;
      case "month":
        cardHeading = `${dateMoment.format("MMMM YYYY")}, ${fromNow}`;
        break;
      case "year":
        cardHeading = `${dateMoment.format("YYYY")}, ${fromNow}`;
        break;
      default:
        cardHeading = `${dateMoment.format("LL")}, ${fromNow}`;
    }
    return (
      <div className={classNames.join(" ")}>
        <div className="content">
          <div className="card-heading">{cardHeading}</div>
          {Object.keys(props.events).map(label => {
            if (props.labels[label]) {
              return props.events[label].map((event, eventIndex) => (
                <Event
                  event={event}
                  granularity={props.granularity}
                  key={`${label}_${eventIndex}`}
                  label={label}
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
  date: PropTypes.string.isRequired,
  events: PropTypes.object.isRequired,
  granularity: PropTypes.string.isRequired,
  isEven: PropTypes.bool.isRequired,
  labels: PropTypes.object.isRequired
};

export default Card;
