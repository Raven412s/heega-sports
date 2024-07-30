import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../api";
import VideoOverlay from "./VideoOverlay";

// OpenNav

function Overlay(movie, onClose) {
  let id = movie.movie.id;
  console.log("movie :", movie);

  fetch(`${BASE_URL}/movie/${id}/videos?${API_KEY}`)
    .then((res) => res.json())
    .then((videoData) => {
      console.log(videoData);
      <VideoOverlay onClose={onClose} videoData={videoData} movie={movie} />;
    });
}

export default Overlay;
