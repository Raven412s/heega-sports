import React, { useState, useEffect } from "react";

function VideoOverlay({ videoData, movie, onClose }) {
  const [embed, setEmbed] = useState([]);
  const [dots, setDots] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (videoData && videoData.results.length > 0) {
      const newEmbed = [];
      const newDots = [];

      videoData.results.forEach((video, idx) => {
        let { name, key, site } = video;
        console.log(video);
        if (site === "YouTube") {
          newEmbed.push(
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${key}`}
              title={`${name}`}
              class="embed hide"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          );

          newDots.push(
            <span
              key={idx}
              className={`dot ${idx === activeSlide ? "active" : ""}`}
              onClick={() => setActiveSlide(idx)}
            >
              {idx + 1}
            </span>
          );
        }
      });

      setEmbed(newEmbed);
      setDots(newDots);
    } else {
      setEmbed([]);
      setDots([]);
    }
  }, [videoData, activeSlide]);

  return (
    <div
      id="myNav"
      className="overlay"
      style={{ width: videoData ? "100%" : "0" }}
    >
      {videoData && videoData.results.length > 0 ? (
        <div>
          <h1 className="no-results">{movie.original_title}</h1>
          <br />
          {embed}
          <br />
          <div className="dots">{dots}</div>
        </div>
      ) : (
        <h1 className="no-results">No Results Found</h1>
      )}
    </div>
  );
}

export default VideoOverlay;
