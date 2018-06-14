import React from "react";
import "../styles/Lifeline.css";
import moment from "moment";
import logoMap from "./logoMap";
import { toggleHidden } from "../scripts/Lifeline.js";

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
