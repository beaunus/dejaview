import React from "react";
import logoMap from "./logoMap";
import "../styles/LabelFilter.css";

function LabelFilter(props) {
  return (
    <div
      className="label-filter"
      onClick={e => {
        props.toggleLabel(props.labelName);
      }}
    >
      <img
        className="label-logo"
        src={logoMap[props.labelName]}
        alt={props.labelName}
      />
      <p>{props.labelName}</p>
    </div>
  );
}

export default LabelFilter;
