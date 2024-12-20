import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/movies') // Backend URL
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    fetch('http://127.0.0.1:5000/movies')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data
        setMovies(data);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);
  
  return (
    <div>
      <h1>Movie Recommendations</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px',
          width: '80%',
          maxWidth: '400px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          fontSize: '16px',
        }}
      />
      <div className="movie-container">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://via.placeholder.com/200x300?text=${movie.title}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
