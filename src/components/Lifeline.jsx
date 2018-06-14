import React from "react";
import "../styles/Lifeline.css";
import moment from "moment";
import logoMap from "./logoMap";
import { toggleHidden } from "../scripts/Lifeline.js";

function Event(props) {
  console.log("props.event", props.event);
  return (
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
}

function Card(props) {
  return (
    <div className={props.classNames.join(" ")}>
      <div className="content">
        <div className="pub-date">
          {moment(new Date(props.date)).format("MMMM D, YYYY")}
        </div>
        {Object.keys(props.events).map((label, index) => {
          return props.events[label].map((event, eventIndex) => {
            return <Event key={eventIndex} label={label} event={event} />;
          });
        })}
      </div>
    </div>
  );
}

function Lifeline(props) {
  console.log(props.events);
  return (
    <div className="lifeline">
      {Object.keys(props.events)
        .sort((a, b) => moment(new Date(b)) > moment(new Date(a)))
        .map((date, index) => {
          const classNames = ["container"];
          if (index % 2 === 0) {
            classNames.push("left");
          } else {
            classNames.push("right");
          }
          return (
            <Card
              events={props.events[date]}
              date={date}
              key={index}
              classNames={classNames}
              index={index}
            />
          );
        })}
    </div>
  );
}

export default Lifeline;
