import React from 'react';
import "./OtherUserBtn.css";

const OtherUserBtn = props => (
  <button
    onClick={() => props.handleFriends(props.id)}
    className={`other-btn ${props["data-value"]}`}
    {...props}

  >
  {props.checkFriend ? "Unvriend" : "Vriend"}
  </button>
);

export default OtherUserBtn;
