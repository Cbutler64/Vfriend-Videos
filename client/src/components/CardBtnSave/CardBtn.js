import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <button
    onClick={props.onClick}
    className={`save-btn ${props["data-value"]}`}
    {...props}
  >
  {props.alreadySaved == true ? "Unsave" : "Save"}
  </button>
);

export default CardBtn;
