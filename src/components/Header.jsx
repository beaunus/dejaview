import React from "react";
import PropTypes from "prop-types";
import Logo from "./Logo.jsx";
import DatePicker from "./DatePicker.jsx";
import Granularity from "./Granularity.jsx";
import LabelFilter from "./LabelFilter";
import FacebookLoginButton from "./FacebookLoginButton";

const Header = props => (
  <div id="header">
    <Logo />
    <div id="date-area">
      <DatePicker
        changeDate={props.changeDate}
        selectedDate={props.selectedDate}
      />
      <Granularity
        changeGranularity={props.changeGranularity}
        granularity={props.granularity}
        navigateByGranularity={props.navigateByGranularity}
      />
    </div>
    <div id="filter-container">
      {Object.keys(props.labels).map((label, index) => {
        return (
          <LabelFilter
            filtered={!props.labels[label]}
            key={index}
            labelName={label}
            toggleLabel={props.toggleLabel}
          />
        );
      })}
      {!props.isLoggedIn ? <FacebookLoginButton /> : ""}
    </div>
  </div>
);

Header.propTypes = {
  event: PropTypes.object.isRequired,
  granularity: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Header;
