
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName =  show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button className="btn btn-info modal-btn" onClick={handleClose}>close</button>
        </section>
      </div>
    );
  };

  export default Modal;

