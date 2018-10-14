import React from "react";
import CardBtn from "../CardBtn";
import "./Card.css";

const Card = props => (
  <div
    className="card"
    key={props.book._id}
    style={{
      backgroundImage: props.image ? `url(${props.image})` : "none"
    }}
  >
    {!props.image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}

    <h5>Username: {props.user}</h5>
    <h5>Realname: {props.realName}</h5>
    <CardBtn
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}
      data-value="pass"
    />
    <CardBtn
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}
      data-value="pick"
    />
  </div>
);

export default Card;
