import React from 'react';
import "./FriendsList.css";
import { List, ListItem } from "../../components/List";

const FriendsList = props => {

    return(
        <div className="friend-card">
        <ListItem>
       
            <img className="friend-img" src={props.image} alt={props.name}/>
            <br></br><br></br>
            <a href={props.userId} > <button className="otherUser" name={props.name}>{props.name}</button> </a>
            
            
            



          
        
        </ListItem>
        </div>
    )

}

export default FriendsList;