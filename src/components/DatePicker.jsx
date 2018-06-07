import React from "react";
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

export default DatePicker;
