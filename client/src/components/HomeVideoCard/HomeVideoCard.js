import React from "react";
import "./HomeVideoCard.css";
import PlayBtn from '../../components/PlayBtn'
import CardBtnSave from '../../components/CardBtnSave'

const HomeVideoCard = props => {
  // console.log(props);
  return (
    <div className="card-video " id="video" >
      <div className="img-container">
        <img src={props.image} />
      </div>
      <div className="content" >
        <strong>Saved By:  </strong> {props.getVideoUsers(props.id)}
        <br></br>
        <strong>Title:</strong> {props.trimmedTitle(props.title)}


      </div>
      <PlayBtn
        style={{ opacity: props.image ? 1 : 0 }}
        onClick={() => props.handleBtnPlay(props.id)}
        data-value="pass"
        id={props.id}


      />
      <CardBtnSave
        style={{ opacity: props.image ? 1 : 0 }}
        onClick={() => props.handleBtnSave(props.id)}
        alreadySaved={props.alreadySaved(props.id)}
        data-value="save"
        id={props.id} />
    </div>
  )
}
  ;

export default HomeVideoCard;