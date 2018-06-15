import React from "react";
import PropTypes from "prop-types";
import GranularityButton from "./GranularityButton";
import "../styles/Granularity.css";

const choices = ["year", "month", "week", "day"];

const Granularity = props => (
  <div className="granularity">
    <div id="granularity-selector">
      {choices.map(choice => (
        <GranularityButton
          key={choice}
          choice={choice}
          granularity={props.granularity}
          changeGranularity={props.changeGranularity}
          navigateByGranularity={props.navigateByGranularity}
        />
      ))}
    </div>
  </div>
);

Granularity.propTypes = {
  granularity: PropTypes.string.isRequired,
  changeGranularity: PropTypes.func.isRequired,
  navigateByGranularity: PropTypes.func.isRequired
};

export default Granularity;
