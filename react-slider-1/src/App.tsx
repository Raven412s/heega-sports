import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import "./App.css";
import SpecialImage from "./Custom/SpecialImage";
import Modal from "./Components/Modal";


interface Image {
  alt: string;
  src: string;
  className: string;
  href: string;
}
const arrImages: Image[] = [
  {
    alt: "img",
    src: "https://heegasports.com/wp-content/uploads/2023/08/1-2.jpg-scaled.webp",
    className: "xzoom-gallery",
    href: "https://heegasports.com/wp-content/uploads/2023/08/1-2.jpg-scaled.webp",
  },
  {
    alt: "img",
    src: "https://heegasports.com/wp-content/uploads/2023/08/Toe-spine.jpg-scaled.webp",
    className: "xzoom-gallery",
    href: "https://heegasports.com/wp-content/uploads/2023/08/Toe-spine.jpg-scaled.webp",
  },
  {
    alt: "img",
    src: "https://heegasports.com/wp-content/uploads/2023/08/Qality.jpg-scaled.webp",
    className: "xzoom-gallery",
    href: "https://heegasports.com/wp-content/uploads/2023/08/Qality.jpg-scaled.webp",
  },
  {
    alt: "img",
    src: "https://heegasports.com/wp-content/uploads/2023/08/Hitting-Area.jpg-scaled.webp",
    className: "xzoom-gallery",
    href: "https://heegasports.com/wp-content/uploads/2023/08/Hitting-Area.jpg-scaled.webp",
  },
  {
    alt: "img",
    src: "https://heegasports.com/wp-content/uploads/2023/08/Handel-grip.jpg-scaled.webp",
    className: "xzoom-gallery",
    href: "https://heegasports.com/wp-content/uploads/2023/08/Handel-grip.jpg-scaled.webp",
  },
  {
    alt: "img",
    src: "./images/img1-min.webp",
    className: "xzoom-gallery",
    href: "./images/img1.webp",
  },
  {
    alt: "img",
    src: "./images/img4-min.webp",
    className: "xzoom-gallery",
    href: "./images/img4.webp",
  },
];

const App: React.FC = () => {
  const lens_ref = useRef<HTMLDivElement>(null);
  const product_img_ref = useRef<HTMLImageElement>(null);
  const magnified_img_ref = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % arrImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + arrImages.length) % arrImages.length);
  };
  useEffect(() => {
    const lens = lens_ref.current;
    const product_img = product_img_ref.current;
    const magnified_img = magnified_img_ref.current;
    const thumbnails = document.querySelectorAll(".xzoom-thumbs a");
  
    const moveLens = (e: MouseEvent) => {
      if (!lens || !product_img || !magnified_img) return;
      let x, y, cx, cy;
      const product_img_rect = product_img.getBoundingClientRect();
      x = e.pageX - product_img_rect.left - lens.offsetWidth / 2;
      y = e.pageY - product_img_rect.top - lens.offsetHeight / 2;
  
      let max_xpos = product_img_rect.width - lens.offsetWidth;
      let max_ypos = product_img_rect.height - lens.offsetHeight;
      if (x > max_xpos) x = max_xpos;
      if (x < 0) x = 0;
      if (y > max_ypos) y = max_ypos;
      if (y < 0) y = 0;
  
      lens.style.cssText = `top: ${y}px; left:${x}px;`;
  
      cx = magnified_img.offsetWidth / (lens.offsetWidth || 1); // Handle possible null
      cy = magnified_img.offsetHeight / (lens.offsetHeight || 1); // Handle possible null
  
      magnified_img.style.cssText = `background: url('${product_img.src}') -${
        x * cx
      }px -${y * cy}px / ${product_img_rect.width * cx}px ${
        product_img_rect.height * cy
      }px no-repeat`;
  
      lens.classList.add("active");
      magnified_img.classList.add("active");
    };
  
    const leaveLens = () => {
      if (lens && magnified_img) {
        lens.classList.remove("active");
        magnified_img.classList.remove("active");
      }
    };
  
    const magnify = () => {
      if (lens && product_img) {
        lens.addEventListener("mousemove", moveLens);
        product_img.addEventListener("mousemove", moveLens);
        product_img.addEventListener("mouseout", leaveLens);
      }
    };
  
    magnify();
  
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", (e) => {
        e.preventDefault();
        if (!product_img || !magnified_img) return;
        
        const newSrc = thumbnail.getAttribute("href");
        const newPreview = thumbnail.querySelector("img")?.getAttribute("src");
        
        if (newSrc) {
          product_img.setAttribute("src", newSrc);
          product_img.setAttribute("xoriginal", newPreview ?? "");
        }
        
        thumbnails.forEach((thumbs) => thumbs.classList.remove("selectedTrue"));
        thumbnail.classList.add("selectedTrue");
        
        const product_img_rect = product_img.getBoundingClientRect();
        const cx = magnified_img.offsetWidth / (lens?.offsetWidth || 1); // Handle possible null
        const cy = magnified_img.offsetHeight / (lens?.offsetHeight || 1); // Handle possible null
        
        magnified_img.style.cssText = `background: url('${newSrc}') -${0}px -${0}px / ${
          product_img_rect.width * cx
        }px ${product_img_rect.height * cy}px no-repeat`;
      });
    });
  
    return () => {
      if (lens && product_img) {
        lens.removeEventListener("mousemove", moveLens);
        product_img.removeEventListener("mousemove", moveLens);
        product_img.removeEventListener("mouseout", leaveLens);
      }
    };
  }, []);
  

  const removeSelectedClass = () => {
    const thumbnails = document.querySelectorAll(".xzoom-thumbs a");
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove("selectedTrue");
    });
  };

  const handleNext = () => {
    if (startIndex + 5 < arrImages.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
      removeSelectedClass();
    }
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    removeSelectedClass();
  };

  const displayedImages = arrImages.slice(startIndex, startIndex + 5);

  return (
    <div className="container">
      <div className="xzoom-thumbs">
        {displayedImages.map((image, index) => (
          <a href={image.href} key={index}>
            <SpecialImage src={image.href} alt={image.alt} className={image.className} />
          </a>
        ))}

        <div id="thumbButtons">
          <FaAngleLeft
            onClick={handlePrev}
            className={`prev-button ${startIndex === 0 ? "disabled" : ""}`}
          />
          <FaAngleRight
            onClick={handleNext}
            className={`nxt-button ${startIndex + 5 >= arrImages.length ? "disabled" : ""}`}
          />
        </div>
      </div>
      <div className="xzoom-container">
        <div className="magnified-img" ref={magnified_img_ref} />
        <a href="#!" id="mainImage" onClick={() => openModal(0)}>
          {arrImages && (
            <SpecialImage
              alt="img"
              ref={product_img_ref}
              src={arrImages[0].src}
              className="xzoom"
              xoriginal="./images/img1-min.webp"
            />
          )}
        </a>
        <div className="lens" ref={lens_ref} />
      </div>
      <div className="description">
        <h1>React image magnifier x slider</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe facere
          voluptates blanditiis mollitia temporibus labore earum non ipsam,
          maxime nisi! A nostrum ea nisi veniam expedita quia? Temporibus
          assumenda aut voluptate aliquam atque quam et ad tenetur! Odit autem
          labore laborum dolor. Corrupti velit earum quasi sit, impedit
          explicabo saepe, aut labore magnam possimus asperiores eaque sed
          voluptates eius cum doloribus! Commodi praesentium temporibus
          explicabo beatae fuga aspernatur quibusdam, repellat aliquid
          distinctio. Voluptatibus laboriosam vel eius, quibusdam debitis modi
          praesentium officiis ducimus odio possimus omnis veniam nisi corporis
          quos sapiente deleniti maiores obcaecati dolore itaque quia eveniet
          exercitationem corrupti? Provident.
        </p>
      </div>
      {isModalOpen && (
        <Modal
          images={arrImages}
          currentIndex={currentIndex}
          closeModal={closeModal}
          nextImage={nextImage}
          prevImage={prevImage}
        />
      )}
    </div>
  );
};

export default App;
