import React from "react";
import "./App.css";
import { FaAngleRight,FaAngleLeft,FaXmark } from "react-icons/fa6";


function Modal({ images, currentIndex, closeModal, nextImage, prevImage }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={images[currentIndex].href}
          alt="carousel"
          className="carousel-image"
        />
      <div className="buttons">
        <FaAngleLeft className="prev" onClick={prevImage} />
      
        <FaXmark className="close" onClick={closeModal} />
         
        <FaAngleRight className="next" onClick={nextImage}/>
       
      </div>
      </div>
    </div>
  );
}

export default Modal;
