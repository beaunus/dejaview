import React from "react";
import PropTypes from "prop-types";

const GranularityNavigator = props => {
  return (
    <div id="granularity-navigator">
      <div
        className="granularity-navigator-button"
        onClick={event => {
          event.preventDefault();
          props.navigateByGranularity("left", "weeks");
        }}
        onKeyPress={event => {
          event.preventDefault();
          props.navigateByGranularity("left", "weeks");
        }}
        role="button"
        tabIndex="0"
      >
        ←
      </div>
      <div
        className="granularity-navigator-button"
        onClick={event => {
          event.preventDefault();
          props.navigateByGranularity("right", "weeks");
        }}
        onKeyPress={event => {
          event.preventDefault();
          props.navigateByGranularity("right", "weeks");
        }}
        role="button"
        tabIndex="0"
      >
        →
      </div>
    </div>
  );
};

GranularityNavigator.propTypes = {
  navigateByGranularity: PropTypes.func.isRequired
};

export default GranularityNavigator;
