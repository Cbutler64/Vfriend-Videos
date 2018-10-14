import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <button
    onClick={props.onClick}
    className={`profile-btn ${props["data-value"]}`}
    {...props}
  >Profile </button>
);

export default CardBtn;
