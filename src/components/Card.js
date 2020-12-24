import './Card.css'
import React from 'react';
import Dots from './dots.png'
import Modal from './Modal'
import { useState } from 'react';

export default function Card(props) {
    let date = new Date(props.items.date * 1000).toDateString();
    // eslint-disable-next-line
    let [weekDay, month, day, year] = date.split(' ');

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);

      let image = document.getElementById("image" + props.items.id);
      if (!isOpen) {
          image.style.opacity = "0.5";
          image.parentElement.children[1].style.opacity = "0";
      } else {
          image.removeAttribute("style");
          image.parentElement.children[1].removeAttribute("style");
      }
    }

    return(
        <div className="Card">
            <div className="Cover">
                <img src={props.items.thumbnail.small} alt={props.items.id} 
                className="Image"
                id={"image" + props.items.id}>
                </img>
                <div className="MoreButtonWrap">
                    <button onClick={toggleModal} className="MoreButton">Learn More</button>
                </div>
            </div>
            {isOpen && <Modal
                        content={props.items}
                        handleClose={toggleModal}
                    />}
            <div className="Post">
                <div className="dots">
                  <img src={Dots} alt="Dots" height="100%"></img> 
                </div>
                <div onClick={toggleModal} className="Title">
                    <div className="Text">
                        {props.items.title}
                    </div>
                </div>
                <div className="Description">
                    <div className="Text" style={{fontSize: "11px"}}>
                        {props.items.content}
                    </div>
                </div>
                <div className="Footer">
                    <div className="Text">
                        {props.items.author.name + ' - ' + props.items.author.role}
                    </div>
                    <div className="Text" style={{marginLeft: "auto", marginRight: "0px"}}>
                        {month + ' ' + day + ', ' + year}
                    </div>
                </div>
                {isOpen && 
                <Modal
                    content={props.items}
                    handleClose={toggleModal}
                />}
            </div>
        </div>
    );
}