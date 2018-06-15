import React from "react";
import PropTypes from "prop-types";
import GranularityNavigator from "./GranularityNavigator";
import GranularitySelector from "./GranularitySelector";
import "../styles/Granularity.css";

const Granularity = props => (
  <div id="granularity-container">
    <GranularitySelector
      granularity={props.granularity}
      changeGranularity={props.changeGranularity}
    />
    <GranularityNavigator navigateByGranularity={props.navigateByGranularity} />
  </div>
);

Granularity.propTypes = {
  granularity: PropTypes.string.isRequired,
  changeGranularity: PropTypes.func.isRequired,
  navigateByGranularity: PropTypes.func.isRequired
};

export default Granularity;
