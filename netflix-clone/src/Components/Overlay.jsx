import React, { useEffect, useState } from 'react';
import { API_URL } from '../api';

function Overlay({ movie, onClose }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/movie/${movie.id}/videos`)
      .then(res => res.json())
      .then(data => setVideos(data.results.video));
  }, [movie]);

  return (
    <div id="myNav" className="overlay" style={{ width: '100%' }}>
      <a href="javascript:void(0)" className="closebtn" onClick={onClose}>&times;</a>
      <div className="overlay-content">
        <h1 className="no-results">{movie.original_title}</h1>
        <br />
        {videos.length > 0 ? (
          videos.map(video => (
            <iframe
              key={video.key}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              className="embed"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ))
        ) : (
          <h1 className="no-results">No Results Found</h1>
        )}
      </div>
    </div>
  );
}

export default Overlay;
