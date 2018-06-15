import React from "react";
import PropTypes from "prop-types";
import "../styles/DatePicker.css";

function DatePicker(props) {
  return (
    <div className="date-picker">
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
  selectedDate: PropTypes.string.isRequired
};

export default DatePicker;
