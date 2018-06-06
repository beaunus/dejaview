import React from "react";
import "../styles/DatePicker.css";

function DatePicker(props) {
  return (
    <div className="date-picker">
      <input type="date" defaultValue={new Date()} />
    </div>
  );
}

export default DatePicker;
