import React from "react";
import "../styles/GranularitySelector.css";

function GranularitySelector(props) {
  return (
    <fieldset>
      <legend>Is this toggle switch awesome?</legend>
      <div className="toggle">
        <input
          type="radio"
          name="sizeBy"
          value="weight"
          id="sizeWeight"
          defaultChecked="checked"
        />
        <label htmlFor="sizeWeight">
          It's pretty, pretty, pretty, pretty good
        </label>
        <input
          type="radio"
          name="sizeBy"
          value="dimensions"
          id="sizeDimensions"
        />
        <label htmlFor="sizeDimensions">100% yes</label>
      </div>
      <p className="status">
        Toggle is <span>auto width</span>
        <span>full width</span>.
      </p>
    </fieldset>
  );
}

export default GranularitySelector;
