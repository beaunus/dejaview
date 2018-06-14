import React from "react";
import "../styles/GranularitySelector.css";

/**
 * Select granularity according to the click or key press event on corresponding button.
 * @param {Event} event
 */
const selectGranularity = event => {
  event.preventDefault();
  event.target.parentNode.querySelector("input").checked = true;
};

function GranularitySelector(props) {
  return (
    <div id="granularity-selector">
      <label htmlFor="granularityDay">
        <input
          type="radio"
          name="granularity"
          id="granularity"
          value="day"
          defaultChecked="checked"
        />
        <div
          className="label"
          id="granularityDay"
          tabIndex="0"
          role="button"
          onClick={selectGranularity}
          onKeyPress={selectGranularity}
        >
          Day
        </div>
      </label>
      <label htmlFor="granularityWeek">
        <input type="radio" name="granularity" id="granularity" value="week" />
        <div
          className="label"
          id="granularityWeek"
          tabIndex="0"
          role="button"
          onClick={selectGranularity}
          onKeyPress={selectGranularity}
        >
          Week
        </div>
      </label>
      <label htmlFor="granularityMonth">
        <input type="radio" name="granularity" id="granularity" value="month" />
        <div
          className="label"
          id="granularityMonth"
          tabIndex="0"
          role="button"
          onClick={selectGranularity}
          onKeyPress={selectGranularity}
        >
          Month
        </div>
      </label>
      <label htmlFor="granularityYear">
        <input type="radio" name="granularity" id="granularity" value="year" />
        <div
          className="label"
          id="granularityYear"
          tabIndex="0"
          role="button"
          onClick={selectGranularity}
          onKeyPress={selectGranularity}
        >
          Year
        </div>
      </label>
    </div>
  );
}

export default GranularitySelector;
