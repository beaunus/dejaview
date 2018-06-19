import React from "react";
import PropTypes from "prop-types";
import logoMap from "./logoMap";
import EventMore from "./EventMore";

const Event = props => (
  <div key={props.label} className="event">
    <div className="headline">
      <img
        className="label-logo"
        src={logoMap[props.label]}
        alt={`${props.label} Logo`}
      />
      <div>
        {props.event.link.length > 0 ? (
          <a
            href={props.event.link}
            key={props.index}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.event.title}
          </a>
        ) : (
          `${props.event.title}`
        )}
      </div>
    </div>
    <EventMore event={props.event} />
  </div>
);

Event.propTypes = {
  label: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired
};

export default Event;
