import React from "react";
import "../styles/NavArrows.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function NavArrows() {
  return (
    <div id="nav-arrows">
      <button>
        <FontAwesomeIcon size={"3x"} icon={faArrowLeft} />
      </button>
      <button>
        <FontAwesomeIcon size={"3x"} icon={faArrowRight} />
      </button>
    </div>
  );
}

export default NavArrows;
