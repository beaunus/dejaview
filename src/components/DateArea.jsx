import React from "react";
import PropTypes from "prop-types";
import DatePicker from "./DatePicker.jsx";
import Granularity from "./Granularity.jsx";

const DateArea = props => (
  <div id="date-area" className="center">
    <DatePicker
      changeDate={props.changeDate}
      selectedDate={props.selectedDate}
    />
    <Granularity
      changeGranularity={props.changeGranularity}
      granularity={props.granularity}
    />
  </div>
);

DateArea.propTypes = {
  changeDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  changeGranularity: PropTypes.func.isRequired,
  granularity: PropTypes.string.isRequired
};

export default DateArea;
