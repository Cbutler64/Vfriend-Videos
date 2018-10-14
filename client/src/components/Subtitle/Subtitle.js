import React from 'react';
import './Subtitle.css';

const Subtitle = props => {
    return(
    <h2 className="subtitle" data={props.data}>{props.data}</h2>
    )
}


export default Subtitle;