import React, { useState } from 'react';
import axios from 'axios';
import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=5a7afbb1`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setError('No movies found!');
      }
    } catch (err) {
      setError('Something went wrong! Try again later.');
    }
    setLoading(false);
  };

  const handleBackButton = () => {
    setMovies([]);
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <MovieSearch fetchMovies={fetchMovies} />

      {/* Back Button */}
      {movies.length > 0 && (
        <button className="back-button" onClick={handleBackButton}>Back to Search</button>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}

export default App;