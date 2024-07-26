import React from 'react';
import { IMG_URL } from '../api';

function Movie({ movie, onClick }) {
  const { title, poster_path, vote_average, overview, id } = movie;

  const getColor = (vote) => {
    if (vote >= 8) return 'green';
    if (vote >= 5) return 'orange';
    return 'red';
  };

  return (
    <div className="movie" onClick={() => onClick(movie)}>
      <img src={poster_path ? `${IMG_URL}${poster_path}` : 'http://via.placeholder.com/1080x1580'} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={getColor(vote_average)}>{vote_average}</span>
      </div>
      <div className="overview">
        <h3>Overview</h3>
        {overview}
        <br />
        <button className="know-more" id={id}>Know More</button>
      </div>
    </div>
  );
}

export default Movie;
