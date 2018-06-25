import React from "react";
import PropTypes from "prop-types";
import Logo from "./Logo.jsx";
import DateArea from "./DateArea";
import LabelFilter from "./LabelFilter";
import FacebookLoginButton from "./FacebookLoginButton";

const Header = props => (
  <div id="header">
    <Logo />
    <DateArea
      changeDate={props.changeDate}
      selectedDate={props.selectedDate}
      changeGranularity={props.changeGranularity}
      granularity={props.granularity}
      navigateByGranularity={props.navigateByGranularity}
    />
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
  changeDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  changeGranularity: PropTypes.func.isRequired,
  granularity: PropTypes.string.isRequired,
  navigateByGranularity: PropTypes.func.isRequired,
  toggleLabel: PropTypes.func.isRequired
};

export default Header;
