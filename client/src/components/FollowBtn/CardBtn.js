import React from "react";
import "./CardBtn.css";

const CardBtn = props => (
  <button
    onClick={props.onClick}
    className={`follow-btn ${props["data-value"]}`}
    {...props}
  >
  {props.checkFriend ? "Unvriend" : "Vriend"}
  </button>
);

export default CardBtn;
