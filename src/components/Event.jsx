import React from "react";
import PropTypes from "prop-types";
import logoMap from "./logoMap";
import { toggleHidden } from "../utilities";

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
      <input type="checkbox" onClick={toggleHidden} />
      <div className="more">more</div>
    </div>
    <p
      className="event-text hidden"
      dangerouslySetInnerHTML={{
        __html: props.event.text.replace("li>", "span>")
      }}
    />
  </div>
);

Event.propTypes = {
  label: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired
};

export default Event;
