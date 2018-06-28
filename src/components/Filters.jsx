import React from "react";
import PropTypes from "prop-types";
import LabelFilter from "./LabelFilter";

const Filters = props => (
  <fieldset>
    <legend id="filter-label-legend">FILTERS</legend>
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
    </div>
  </fieldset>
);

Filters.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  labels: PropTypes.object.isRequired,
  toggleLabel: PropTypes.func.isRequired
};

export default Filters;
