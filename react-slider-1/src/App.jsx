import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import "./App.css";
import Modal from "./Modal";

function App() {
  const lens_ref = useRef();
  const product_img_ref = useRef();
  const magnified_img_ref = useRef();
  const [startIndex, setStartIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
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
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + arrImages.length) % arrImages.length
    );
  };
  const arrImages = [
    {
      alt: "img",
      src: "./images/img1-min.webp",
      className: "xzoom-gallery",
      href: "./images/img1.webp",
    },
    {
      alt: "img",
      src: "./images/img2-min.webp",
      className: "xzoom-gallery",
      href: "./images/img2.webp",
    },
    {
      alt: "img",
      src: "./images/img3-min.webp",
      className: "xzoom-gallery",
      href: "./images/img3.webp",
    },
    {
      alt: "img",
      src: "./images/img4-min.webp",
      className: "xzoom-gallery",
      href: "./images/img4.webp",
    },
    {
      alt: "img",
      src: "./images/img5-min.webp",
      className: "xzoom-gallery",
      href: "./images/img5.webp",
    },
    {
      alt: "img",
      src: "./images/img1-min.webp",
      className: "xzoom-gallery",
      href: "./images/img1.webp",
    },
    {
      alt: "img",
      src: "./images/img1-min.webp",
      className: "xzoom-gallery",
      href: "./images/img1.webp",
    },
  ];

  useEffect(() => {
    const lens = lens_ref.current;
    const product_img = product_img_ref.current;
    const magnified_img = magnified_img_ref.current;
    const thumbnails = document.querySelectorAll(".xzoom-thumbs a");

    const moveLens = (e) => {
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

      cx = magnified_img.offsetWidth / lens.offsetWidth;
      cy = magnified_img.offsetHeight / lens.offsetHeight;

      magnified_img.style.cssText = `background: url('${product_img.src}') -${
        x * cx
      }px -${y * cy}px / ${product_img_rect.width * cx}px ${
        product_img_rect.height * cy
      }px no-repeat`;

      lens.classList.add("active");
      magnified_img.classList.add("active");
    };

    const leaveLens = () => {
      lens.classList.remove("active");
      magnified_img.classList.remove("active");
    };

    const magnify = () => {
      lens.addEventListener("mousemove", moveLens);
      product_img.addEventListener("mousemove", moveLens);
      product_img.addEventListener("mouseout", leaveLens);
    };

    magnify();

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("mouseover", (e) => {
        e.preventDefault();
        const newSrc = thumbnail.getAttribute("prop");
        const newPreview = thumbnail.querySelector("img").getAttribute("src");
        product_img.setAttribute("src", newSrc);
        product_img.setAttribute("xoriginal", newPreview);

        thumbnails.forEach((thumbs) => thumbs.classList.remove("selectedTrue"));

        thumbnail.classList.add("selectedTrue");

        const product_img_rect = product_img.getBoundingClientRect();
        const cx = magnified_img.offsetWidth / lens.offsetWidth;
        const cy = magnified_img.offsetHeight / lens.offsetHeight;
        magnified_img.style.cssText = `background: url('${newSrc}') -${0}px -${0}px / ${
          product_img_rect.width * cx
        }px ${product_img_rect.height * cy}px no-repeat`;
      });
    });

    return () => {
      lens.removeEventListener("mousemove", moveLens);
      product_img.removeEventListener("mousemove", moveLens);
      product_img.removeEventListener("mouseout", leaveLens);
    };
  }, []);

  const handleNext = () => {
    if (startIndex + 5 < arrImages.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const displayedImages = arrImages.slice(startIndex, startIndex + 5);

  return (
    <div className="container">
      <div className="xzoom-thumbs">
        {displayedImages.map((image, index) => (
          <a
            href="#!"
            prop={image.href}
            key={index}
            onClick={() => openModal(0)}
          >
            <img src={image.href} alt={image.alt} className={image.className} />
          </a>
        ))}

        <div id="thumbButtons">
          <FaAngleRight
            onClick={handlePrev}
            className="prev-button"
            disabled={startIndex === 0}
          />

          <FaAngleRight
            onClick={handleNext}
            className="nxt-button"
            disabled={startIndex + 5 >= arrImages.length}
          />
        </div>
      </div>
      <div className="xzoom-container">
        <a href="#!" className="mainImage" onClick={() => openModal(0)}>
          <img
            alt="img"
            ref={product_img_ref}
            src="./images/img1.webp"
            className="xzoom"
            xoriginal="./images/img1-min.webp"
          />
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

        <div className="magnified-img" ref={magnified_img_ref} />
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
}

export default App;
