import React from "react";
import "../styles/New.css";
import moment from "moment";
import logoMap from "./logoMap";
import { toggleHidden } from "../scripts/Lifeline.js";

function Lifeline(props) {
  return (
    <div className="lifeline">
      {Object.keys(props.events)
        .sort((a, b) => moment(new Date(b)) > moment(new Date(a)))
        .map((key, index) => {
          const classNames = ["container"];
          if (index % 2 === 0) {
            classNames.push("left");
          } else {
            classNames.push("right");
          }
          return (
            <div key={key} className={classNames.join(" ")}>
              <div className="content">
                <div className="pub-date">
                  {moment(new Date(key)).format("MMMM D, YYYY")}
                </div>
                {Object.keys(props.events[key]).map((subKey, index2) => {
                  return (
                    <div key={subKey} className="event">
                      <div className="headline">
                        <img
                          className="label-logo"
                          src={logoMap[subKey]}
                          alt={subKey + " Logo"}
                        />
                        <div>
                          {props.events[key][subKey][0].link.length > 0 ? (
                            <a
                              href={props.events[key][subKey][0].link}
                              key={index}
                              target="_blank"
                            >
                              {props.events[key][subKey][0].title}
                            </a>
                          ) : (
                            `${props.events[key][subKey][0].title}`
                          )}
                        </div>
                        <input type="checkbox" onClick={toggleHidden} />
                        <div className="more">more</div>
                      </div>
                      <p
                        className="event-text hidden"
                        dangerouslySetInnerHTML={{
                          __html: props.events[key][subKey][0].text.replace(
                            "li>",
                            "span>"
                          )
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Lifeline;
