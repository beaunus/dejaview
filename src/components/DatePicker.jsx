import React from "react";
import PropTypes from "prop-types";
import "../styles/DatePicker.css";

function DatePicker(props) {
  return (
    <div id="date-picker">
      <input
        type="date"
        defaultValue={props.selectedDate}
        onChange={e => {
          props.changeDate(e.target.value);
        }}
      />
    </div>
  );
}

DatePicker.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  changeDate: PropTypes.func.isRequired
};

export default DatePicker;
