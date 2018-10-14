import React from "react";
import { Link } from "react-router-dom";

export const FormBtn = props => (
  
     <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
     {
       props.linkTo ?
      (
        <Link to={props.linkTo}>{props.children}
        </Link>
      ) : (
        props.children
      )
     }
    </button> 
  

);
