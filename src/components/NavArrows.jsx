import React from "react";
import PropTypes from "prop-types";
import "../styles/NavArrows.css";
import moment from "moment";
import { offsetDate } from "../utilities";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function NavArrows(props) {
  const granularity = `${props.granularity}s`;
  const prevDate = moment(
    offsetDate(props.selectedDate, granularity, -7)
  ).format("YYYY-MM-DD");
  const nextDate = moment(
    offsetDate(props.selectedDate, granularity, 7)
  ).format("YYYY-MM-DD");
  const today = moment().format("YYYY-MM-DD");

  return (
    <div id="nav-arrows">
      <button>
        <FontAwesomeIcon
          size={"3x"}
          icon={faArrowLeft}
          onClick={() => props.changeDate(prevDate)}
        />
      </button>
      <button id="btn-today" onClick={() => props.changeDate(today)}>
        Today
      </button>
      <button>
        <FontAwesomeIcon
          size={"3x"}
          icon={faArrowRight}
          onClick={() => props.changeDate(nextDate)}
        />
      </button>
    </div>
  );
}

NavArrows.propTypes = {
  changeDate: PropTypes.func.isRequired,
  granularity: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired
};

export default NavArrows;
