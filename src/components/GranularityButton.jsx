import React from "react";
import PropTypes from "prop-types";

const getCurrentSelectedGranularity = () => {
  for (const radioButton of document.getElementsByName("granularity")) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
};

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

GranularityButton.propTypes = {
  choice: PropTypes.string.isRequired,
  granularity: PropTypes.string.isRequired,
  changeGranularity: PropTypes.func.isRequired
};

export default GranularityButton;
