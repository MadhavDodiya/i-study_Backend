import React from "react";
import preloaderIcon from "../assets/Images/imgi_1_preloader-icon.png";

function Preloader() {
  return (
    <div className="preloader-screen">
      <div className="preloader-wrap">
        <div className="preloader-ring">
          <span className="preloader-arc" aria-hidden="true"></span>
          <img src={preloaderIcon} alt="Loading icon" className="preloader-icon" />
        </div>
        <p className="preloader-text">Loading...</p>
      </div>
    </div>
  );
}

export default Preloader;
