import React from "react";
import PropTypes from "prop-types";
import GranularityButton from "./GranularityButton";
import moment from "moment";
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
        />
      ))}
    </div>
    <button
      id="btn-today"
      onClick={() => props.changeDate(moment().format("YYYY-MM-DD"))}
    >
      Today
    </button>
  </div>
);

Granularity.propTypes = {
  granularity: PropTypes.string.isRequired,
  changeGranularity: PropTypes.func.isRequired
};

export default Granularity;
