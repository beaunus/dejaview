import React from "react";
import "../styles/FacebookLoginButton.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFacebookSquare from "@fortawesome/fontawesome-free-brands/faFacebookSquare";

const FacebookLoginButton = () => (
  <div id="login-button-area">
    <a href="/auth/facebook">
      <div className="facebook-login">
        <FontAwesomeIcon icon={faFacebookSquare} />
        <div>Log In</div>
      </div>
    </a>
  </div>
);

export default FacebookLoginButton;
