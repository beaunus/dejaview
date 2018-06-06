import React from "react";
import "../styles/DatePicker.css";
import moment from "moment";

function DatePicker(props) {
  return (
    <div className="date-picker">
      <input type="date" defaultValue={moment().format("YYYY-MM-DD")} />
    </div>
  );
}

export default DatePicker;
