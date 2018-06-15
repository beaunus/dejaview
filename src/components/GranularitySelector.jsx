import React from "react";
import PropTypes from "prop-types";
import GranularityButton from "./GranularityButton";
import "../styles/GranularitySelector.css";

const choices = ["day", "week", "month", "year"];

const GranularitySelector = props => (
  <div id="granularity-selector">
    {choices.map(choice => (
      <GranularityButton
        key={choice}
        choice={choice}
        granularity={props.granularity}
        changeGranularity={props.changeGranularity}
      />
    ))}
  </div>
);

GranularitySelector.propTypes = {
  granularity: PropTypes.string.isRequired,
  changeGranularity: PropTypes.func.isRequired
};

export default GranularitySelector;
