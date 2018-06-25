import React from "react";
import "../styles/Loader.css";

const Loader = () => (
  <div className="loader">
    <div className="trinity-rings-spinner">
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
    </div>
  </div>
);

Loader.propTypes = {};

export default Loader;
