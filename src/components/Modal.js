import './Modal.css'
import React from 'react';
import { useRef, useEffect } from "react";

export default function Popup(props) {
  let avatarExists = true;
  if (props.content.author.avatar == null) {
      avatarExists = false;
  }

  const handleClick = () => {
    props.handleClose();
  }

  let boxRef = useRef();
  
  useEffect(() => {
    let handler = (event) => {
      if (boxRef && boxRef.current && (boxRef.current === event.target)) {
        handleClick();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div ref={boxRef} className="modal-box" id={"modal-box" + props.content.id}>
      <div className="box" id={"box" + props.content.id}>
        <div className="close" onClick={handleClick}>
            <div style={{margin: "auto"}}>&#10005;</div>
        </div>
        <img className="Modal-Image" src={props.content.thumbnail.large} alt={props.content.id}></img>
        <div className="Modal-Title">{props.content.title}</div>
        <div className="Modal-Description">{props.content.content}</div>
        <div className="Modal-Footer">
          <div className="Avatar">
              {avatarExists && <img 
                  src={props.content.author.avatar} 
                  style={{width: "50px", height: "50px", borderRadius: "25px"}} 
                  alt="Author Avatar"
              >
              </img>}
          </div>
          <div className="NameRole">
              <div style={{fontFamily: "Lato"}}>
                  {props.content.author.name + ' - ' + props.content.author.role}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
