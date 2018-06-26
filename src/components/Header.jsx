import React from "react";
import PropTypes from "prop-types";
import Logo from "./Logo.jsx";
import DateArea from "./DateArea";
import Filters from "./Filters";

const Header = props => (
  <div id="header">
    <Logo />
    <div className="center">
      <DateArea
        changeDate={props.changeDate}
        selectedDate={props.selectedDate}
        changeGranularity={props.changeGranularity}
        granularity={props.granularity}
      />
    </div>
    <Filters
      isLoggedIn={props.isLoggedIn}
      labels={props.labels}
      toggleLabel={props.toggleLabel}
    />
  </div>
);

Header.propTypes = {
  changeDate: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  selectedDate: PropTypes.string.isRequired,
  changeGranularity: PropTypes.func.isRequired,
  granularity: PropTypes.string.isRequired,
  toggleLabel: PropTypes.func.isRequired
};

export default Header;
