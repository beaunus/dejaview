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
  return (
    <div className={classNames.join(" ")}>
      <div className="content">
        <div className="pub-date">
          {moment(new Date(props.date)).format("MMMM D, YYYY")}
        </div>
        {Object.keys(props.events).map(label =>
          props.events[label].map((event, eventIndex) => (
            <Event key={`${label}_${eventIndex}`} label={label} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

const Lifeline = props => (
  <div className="lifeline">
    {Object.keys(props.events)
      .sort((a, b) => moment(new Date(b)) > moment(new Date(a)))
      .map((date, index) => (
        <Card
          events={props.events[date]}
          date={date}
          key={index}
          isEven={index % 2 === 0}
        />
      ))}
  </div>
);

export default Lifeline;
