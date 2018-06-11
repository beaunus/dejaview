import React from "react";
import "../styles/Lifeline.css";
import moment from "moment";
import logoMap from "./logoMap";

function Lifeline(props) {
  return (
    <div className="lifeline">
      <ul>
        {Object.keys(props.events)
          .sort((a, b) => moment(new Date(b)) > moment(new Date(a)))
          .map((key, index) => {
            return (
              <li key={"li_" + index}>
                <div className="lifeline scale-in-center">
                  <div key={index} className="pub-date">
                    {moment(new Date(key)).format("MMMM D, YYYY")}
                  </div>
                  {Object.keys(props.events[key]).map((subKey, index2) => {
                    return (
                      <div className="headline" key={"div_" + index}>
                        <img
                          className="label-logo"
                          src={logoMap[subKey]}
                          alt="New York Times Logo"
                        />
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
                        <p
                          className="event-text"
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
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Lifeline;
