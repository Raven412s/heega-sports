import "./App.css";
import { useEffect, useRef } from "react";

function App() {
  const lens_ref = useRef();
  const product_img_ref = useRef();
  const magnified_img_ref = useRef();

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

      lens.style.cssText = `top: ${y}px; left:${x}px`;

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
        const newSrc = thumbnail.getAttribute("href");
        const newPreview = thumbnail
          .querySelector("img")
          .getAttribute("xpreview");
        product_img.setAttribute("src", newSrc);
        product_img.setAttribute("xoriginal", newPreview);
        
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
  }, [lens_ref, product_img_ref, magnified_img_ref]);

  return (
    <div className="container">
      <div className="xzoom-thumbs">
        <a href="./images/img1.webp">
          <img
            alt="img"
            src="./images/img1-min.webp"
            className="xzoom-gallery"
            xpreview="./images/img1-min.webp"
          />
        </a>
        <a href="./images/img2.webp">
          <img
            alt="img"
            src="./images/img2-min.webp"
            className="xzoom-gallery"
          />
        </a>
        <a href="./images/img3.webp">
          <img
            alt="img"
            src="./images/img3-min.webp"
            className="xzoom-gallery"
          />
        </a>
        <a href="./images/img4.webp">
          <img
            alt="img"
            src="./images/img4-min.webp"
            className="xzoom-gallery"
          />
        </a>
        <a href="./images/img5.webp">
          <img
            alt="img"
            src="./images/img5-min.webp"
            className="xzoom-gallery"
          />
        </a>
    
      </div>
      <div className="xzoom-container">
        <img
          alt="img"
          ref={product_img_ref}
          src="./images/img1.webp"
          className="xzoom"
          xoriginal="./images/img1-min.webp"
        />
        <div className="lens" ref={lens_ref} />
      </div>
      <div className="description">
      <h1>React image magnifier x slider</h1>
        <div className="magnified-img" alt="img" ref={magnified_img_ref} />
      </div>
    </div>
  );
}

export default App;
