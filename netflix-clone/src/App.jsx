import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Tags from './Components/Tags';
import Movies from './Components/Movies';
import Overlay from './Components/Overlay';
import Pagination from './Components/Pagination';
import { API_URL, genres, searchURL } from './api';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  const getMovies = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setPage(data.page);
        setTotalPages(data.total_pages);
      });
  };

  const handleSearch = (query) => {
    const url = query ? `${searchURL}&query=${query}` : API_URL;
    getMovies(url);
  };

  const handleGenreClick = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(updatedGenres);

    const genreQuery = updatedGenres.length ? `&with_genres=${updatedGenres.join(',')}` : '';
    getMovies(`${API_URL}${genreQuery}`);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="use-primary"><Tags genres={genres} selectedGenres={selectedGenres} onGenreClick={handleGenreClick} />
      <Movies movies={movies} onMovieClick={setCurrentMovie} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      {currentMovie && <Overlay movie={currentMovie} onClose={() => setCurrentMovie(null)} />}</div>
    </>
  );
}

export default App;
