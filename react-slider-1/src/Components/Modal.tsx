import React, { useState } from "react";
import { FaAngleRight, FaAngleLeft, FaXmark } from "react-icons/fa6";

interface Image {
  alt: string;
  src: string;
  className: string;
  href: string;
}

interface ModalProps {
  images: Image[];
  currentIndex: number;
  closeModal: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

const Modal: React.FC<ModalProps> = ({
  images,
  currentIndex,
  closeModal,
  nextImage,
  prevImage,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDoubleClick = () => {
    setIsZoomed((prevZoom) => !prevZoom);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={images[currentIndex].href}
          alt="carousel"
          className={`carousel-image ${isZoomed ? "zoomed" : ""}`}
          onDoubleClick={handleDoubleClick}
        />
      </div>
        <div className="buttons">
          <FaAngleLeft className="prev" onClick={prevImage} />
          <FaXmark className="close" onClick={closeModal} />
          <FaAngleRight className="next" onClick={nextImage} />
        </div>
    </div>
  );
};

export default Modal;
