import React from "react";
import "./ProfileCard.css";

const ProfileCard = props => (
  <div className="card profileCard" id="profileCard" >
    <div className="img-container">
      <img className="profile-img" alt={props.name} src={props.image} />
    </div>
    <div className="content" >
      <ul>
        <li>
          <strong>Username:</strong> {props.name}
        </li>
        <li>
          <strong>Real Name:</strong> {props.realname}
        </li>
        <li>
          <strong>Gender:</strong> {props.gender}
        </li>
      </ul>
    </div>
   
  </div>
);

export default ProfileCard;
