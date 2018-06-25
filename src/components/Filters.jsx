import React from "react";
import PropTypes from "prop-types";
import LabelFilter from "./LabelFilter";
import FacebookLoginButton from "./FacebookLoginButton";

const Filters = props => (
  <div id="filter-container">
    {Object.keys(props.labels).map((label, index) => {
      return (
        <LabelFilter
          filtered={!props.labels[label]}
          key={index}
          labelName={label}
          toggleLabel={props.toggleLabel}
        />
      );
    })}
    {!props.isLoggedIn ? <FacebookLoginButton /> : ""}
  </div>
);

Filters.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  labels: PropTypes.object.isRequired,
  toggleLabel: PropTypes.func.isRequired
};

export default Filters;
