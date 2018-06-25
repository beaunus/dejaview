import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCode, faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => (
  <footer>
    <div>
      <FontAwesomeIcon icon={faCode} /> with <FontAwesomeIcon icon={faHeart} />{" "}
      by{" "}
      <a href="about.html" target="_blank">
        Déjà View Team
      </a>.
    </div>
    <div>
      Where did you get the{" "}
      <a href="data.html" target="_blank">
        Data
      </a>?
    </div>
  </footer>
);

export default Footer;
