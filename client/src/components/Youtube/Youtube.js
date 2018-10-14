import React from "react";


const Youtube = props => {
    // console.log(props);
    
    return (
        <div>
            <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+ props.src} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>

    );
}
   

    
    export default Youtube;