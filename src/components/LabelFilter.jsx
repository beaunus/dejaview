import React from "react";
import logoMap from "./logoMap";
import "../styles/LabelFilter.css";

function LabelFilter(props) {
  return (
    <div
      className={`label-filter ${props.filtered ? "filtered-label" : ""}`}
      onClick={e => {
        props.toggleLabel(props.labelName, e.target);
      }}
    >
      <img
        className="label-logo"
        src={logoMap[props.labelName]}
        alt={props.labelName}
      />
      <div>{props.labelName}</div>
    </div>
  );
}

export default LabelFilter;
