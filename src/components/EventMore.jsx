import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

const EventMore = props => {
  if (props.event.text.length < 1) {
    return "";
  }
  return (
    <div className="event-more">
      {props.event.media_link !== null &&
        props.event.media_link.length > 0 && (
          <ReactPlayer
            className="event-more-media"
            url={props.event.media_link}
            controls={true}
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
      <p
        className="event-more-text"
        dangerouslySetInnerHTML={{
          __html: props.event.text.replace("li>", "span>")
        }}
      />
    </div>
  );
};

EventMore.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventMore;
