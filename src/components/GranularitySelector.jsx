import React from "react";
import "../styles/GranularitySelector.css";

function GranularitySelector(props) {
  return (
    <div id="granularity-selector">
      <label htmlFor="granularityDay">
        <input
          type="radio"
          name="granularity"
          value="day"
          id="granularityDay"
          defaultChecked="checked"
        />
        <div className="label">Day</div>
      </label>
      <label htmlFor="granularityWeek">
        <input
          type="radio"
          name="granularity"
          value="week"
          id="granularityWeek"
        />
        <div className="label">Week</div>
      </label>
      <label htmlFor="granularityMonth">
        <input
          type="radio"
          name="granularity"
          value="month"
          id="granularityMonth"
        />
        <div className="label">Month</div>
      </label>
      <label htmlFor="granularityYear">
        <input
          type="radio"
          name="granularity"
          value="year"
          id="granularityYear"
        />
        <div className="label">Year</div>
      </label>
    </div>
  );
}

export default GranularitySelector;
