import React from 'react';
import './Modal.css';

function Modal({ images, currentIndex, closeModal, nextImage, prevImage }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <button className="prev" onClick={prevImage}>&#10094;</button>
        <img src={images[currentIndex].href} alt="carousel" className="carousel-image" />
        <button className="next" onClick={nextImage}>&#10095;</button>
      </div>
    </div>
  );
}

export default Modal;
