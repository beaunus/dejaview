import React from "react";
import "../styles/Loader.css";

const Loader = props => {
  let someLabelsAreSelected = false;
  Object.keys(props.labels).map(
    label => (someLabelsAreSelected |= props.labels[label])
  );

  if (Object.keys(props.labels).length > 0 && !someLabelsAreSelected) {
    return (
      <div className="loader">
        <img alt="felix" src="./images/felix.png" />
        <p>
          I&apos;m gonna need you to go ahead and not un-select all of the data
          source filters.
        </p>
      </div>
    );
  }
  return (
    <div className="loader">
      <div className="trinity-rings-spinner">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </div>
  );
};

Loader.propTypes = {};

export default Loader;
