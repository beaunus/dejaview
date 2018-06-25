import React from "react";
import PropTypes from "prop-types";

const Felix = props => (
  <div className="loader">
    <img alt="felix" src="./images/felix.png" />
    <p>{props.quote}</p>
  </div>
);

Felix.propTypes = {
  quote: PropTypes.string.isRequired
};

export default Felix;
