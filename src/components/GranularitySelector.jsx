import React from "react";
import "../styles/GranularitySelector.css";

const getCurrentSelectedGranularity = () => {
  for (const radioButton of document.getElementsByName("granularity")) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
};

/**
 * Select granularity according to the click or key press event on corresponding button.
 * @param {Event} event
 */
const selectGranularity = (event, changeGranularity) => {
  event.preventDefault();
  event.target.parentNode.querySelector("input").checked = true;
  const selectedGranularity = getCurrentSelectedGranularity();
  changeGranularity(selectedGranularity);
};

const GranularityButton = props => (
  <label htmlFor={`granularity-${props.choice}`}>
    <input
      type="radio"
      name="granularity"
      id={`granularity-${props.choice}`}
      value={props.choice}
      defaultChecked={props.granularity === props.choice}
    />
    <div
      className="label"
      id={`granularity-${props.choice}`}
      tabIndex="0"
      role="button"
      onClick={event => selectGranularity(event, props.changeGranularity)}
      onKeyPress={event => selectGranularity(event, props.changeGranularity)}
    >
      {props.choice.toUpperCase()}
    </div>
  </label>
);

const choices = ["day", "week", "month", "year"];

const GranularitySelector = props => (
  <div id="granularity-selector">
    {choices.map(choice => (
      <GranularityButton
        key={choice}
        choice={choice}
        granularity={props.granularity}
        changeGranularity={props.changeGranularity}
      />
    ))}
  </div>
);

export default GranularitySelector;
