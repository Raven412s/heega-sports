import React from 'react';

function Tags({ genres, selectedGenres, onGenreClick }) {
  return (
    <div id="tags">
      {genres.map(genre => (
        <div
          key={genre.id}
          className={`tag ${selectedGenres.includes(genre.id) ? 'highlight' : ''}`}
          onClick={() => onGenreClick(genre.id)}
        >
          {genre.name}
        </div>
      ))}
      {selectedGenres.length > 0 && (
        <div className="tag highlight" onClick={() => onGenreClick(null)}>
          Clear x
        </div>
      )}
    </div>
  );
}

export default Tags;
