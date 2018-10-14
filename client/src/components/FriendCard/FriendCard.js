import React from "react";
import "./FriendCard.css";
import FollowBtn from '../../components/FollowBtn';
import ProfileBtn from '../../components/ProfileBtn';

const FriendCard = props => (
  <div className="card" >
    <div className="img-container" onClick={() => props.goToFriend(props.id)}>
      <img alt={props.name} src={props.image} />
    </div>
    <div className="content" >
      <ul>
        <li>
          <strong>Name:</strong> {props.name}
        </li>
        <li>
          <strong>Real Name:</strong> {props.realname}
        </li>
        <li>

        </li>
      </ul>

      <div className="profile-btns"></div>
      <FollowBtn
        data-value="follow"
        onClick={() => props.handleFriends(props.id)}
        id={props.id}
        checkFriend={props.checkFriend(props.id)}
      />
      <ProfileBtn
        data-value="profile"
        onClick={() => props.goToFriend(props.id)}
        id={props.id}
      />

    </div>

  </div>
);

export default FriendCard;
