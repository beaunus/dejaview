import React from "react";
import PropTypes from "prop-types";
import logoMap from "./logoMap";
import ReactPlayer from "react-player";
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
    <div className="event-more">
      <p
        className="event-more-text"
        dangerouslySetInnerHTML={{
          __html: props.event.text.replace("li>", "span>")
        }}
      />
      {props.event.media_link !== null &&
        props.event.media_link.length > 0 && (
          <ReactPlayer
            className="event-more-media"
            url={props.event.media_link}
            controls={true}
            width="30%"
            height="50%"
          />
        )}
      {(props.event.media_link === null ||
        props.event.media_link.length === 0) &&
        (props.event.image_link && (
          <a
            href={props.event.image_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="event-more-image"
              src={props.event.image_link}
              alt={props.event.title}
            />
          </a>
        ))}
    </div>
  </div>
);

Event.propTypes = {
  label: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired
};

export default Event;
