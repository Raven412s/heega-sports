import React from 'react';
import Movie from './Movie';

function Movies({ movies, onMovieClick }) {
  return (
    <main id="main">
      {movies.length > 0 ? (
        movies.map(movie => <Movie key={movie.id} movie={movie} onClick={onMovieClick} />)
      ) : (
        <h1 className="no-results">No Results Found</h1>
      )}
    </main>
  );
}

export default Movies;
