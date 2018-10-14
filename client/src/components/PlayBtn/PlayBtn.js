import React from "react";
import "./PlayBtn.css";

const PlayBtn = props => (
  <button
    onClick={props.onClick}
    className={`play-btn ${props["data-value"]}`}
    {...props}
    
    
  >
  Play </button>
);

export default PlayBtn;
